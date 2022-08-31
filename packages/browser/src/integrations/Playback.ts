import { getCurrentHub } from "@booji/hub";
import { Client, Integration, Playback, PlaybackOptions } from "@booji/types";
import { emitter, logger } from "@booji/utils";
/**
 *
 * 用户行为回放集成
 * @remarks
 * 实现了 {@link @booji/types#Integration} 接口
 * @public
 */
export class PlaybackIntegration implements Integration {
  /**
   * {@inheritDoc @booji/types#Integration.name}
   */
  name: string = "PlaybackIntegration";

  /**
   * {@inheritDoc  @booji/types#Integration.setup}
   */
  setup() {
    emitter.once(this.onClientBinded);
  }

  /**
   * {@inheritDoc  @booji/types#Integration.onClientBinded}
   */
  onClientBinded(client: Client) {
    const { playback }: PlaybackOptions = client.getOptions();

    if (!playback) return;

    if (typeof playback !== "function") {
      return logger.warn(`请传入 rrweb 的 record 函数`);
    }

    playback({
      emit(playback: Playback) {
        getCurrentHub().collectPlayback(playback);
      },
    });
  }
}

// /**
//  * Playback 插装
//  * @internal
//  */
// class PlaybackInstrument {
//   static setup() {
//     record({
//       emit(playback: Playback) {
//         getCurrentHub().collectPlayback(playback);
//       },
//     });
//   }
// }
