import { getCurrentHub } from "@booji/hub";
import { Client, Integration, Playback, PlaybackOptions } from "@booji/types";
import { emitter, Queue } from "@booji/utils";
import { record } from "rrweb";

/**
 * 最大回放数据量
 * @internal
 */
export const MAX_PLAYBACKS = 10;

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
    const { playback = false, maxPlaybacks = MAX_PLAYBACKS }: PlaybackOptions =
      client.getOptions();

    if (playback && maxPlaybacks > 0) {
      const queue = new Queue<Playback>(maxPlaybacks);
      PlaybackInstrument.setup(queue);
    }
  }
}

/**
 * Playback 插装
 * @internal
 */
class PlaybackInstrument {
  static setup(queue: Queue<Playback>) {
    record({
      emit(playback: Playback) {
        getCurrentHub().collectPlayback(playback, queue);
      },
    });
  }
}
