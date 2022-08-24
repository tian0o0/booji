import { Integration, Options } from "@booji/types";

/**
 *
 * @param options - {@link @booji/types#Options}
 * @returns {@link @booji/types#Integration}[]
 * @internal
 */
function normalizeIntegrations(options: Options): Integration[] {
  let integrations = ((options.defaultIntegrations &&
    options.defaultIntegrations) ||
    []) as Integration[];
  const userIntegrations = options.integrations;

  if (Array.isArray(userIntegrations)) {
    integrations = [
      ...integrations.filter((integrations) =>
        userIntegrations.every(
          (userIntegration) => userIntegration.name !== integrations.name
        )
      ),
      ...userIntegrations,
    ];
  }

  return integrations;
}

/**
 * 初始化集成
 * @param options - {@link @booji/types#Options}
 * @returns void
 */
export function setupIntegrations(options: Options) {
  // const map: IntegrationMap = {};
  normalizeIntegrations(options).forEach((integration) => {
    // map[integration.name] = integration;
    integration.setup();
  });
  // return map;
}

/**
 * 集成map
 * @deprecated
 */
export type IntegrationMap = { [key: string]: Integration };
