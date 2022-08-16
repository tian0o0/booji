import { getCurrentHub } from "@booji/hub";
import { Client, Integration, Playback, PlaybackOptions } from "@booji/types";
import { emitter } from "@booji/utils";
import { record } from "rrweb";
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
    const { playback = false }: PlaybackOptions = client.getOptions();

    playback && PlaybackInstrument.setup();
  }
}

/**
 * Playback 插装
 * @internal
 */
class PlaybackInstrument {
  static setup() {
    record({
      emit(playback: Playback) {
        PlaybackInstrument.handle(playback);
      },
    });
  }

  static handle(playback: Playback) {
    getCurrentHub().collectPlayback(playback);
  }
}
