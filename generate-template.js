const randomWords = require('random-words');
const yaml = require('js-yaml');

const createSecrets = (count) => {
  let secrets = {};

  for (let i = 0; i < count; i++) {
    secrets[`${randomWords(2).join('_').toUpperCase()}`] =
      randomWords(7).join(' ');
  }

  return secrets;
};

const createBranchConfigs = (environment, count) => {
  const configs = [];
  for (let i = 0; i < count; i++) {
    configs.push({ slug: `${environment}_${randomWords()}` });
  }
  return configs;
};

const createBranchConfigSecrets = (configs, count) => {
  const secrets = {};

  for (let config of configs) {
    secrets[config.slug] = createSecrets(count);
  }

  return secrets;
};

const PROJECT_NAME = 'heroku-branch-config-sync-test'
const ROOT_SECRETS = { prd: createSecrets(56) };
const BRANCH_CONFIGS = createBranchConfigs('prd', 30);
const BRANCH_CONFIG_SECRETS = createBranchConfigSecrets(BRANCH_CONFIGS, 3);

let template = {
  projects: [
    {
      name: PROJECT_NAME,
      description: '',
      environments: [
        {
          name: 'Production',
          slug: 'prd',
          configs: [{ slug: 'prd' }].concat(BRANCH_CONFIGS),
        },
      ],
      secrets: {
        ...ROOT_SECRETS,
        ...BRANCH_CONFIG_SECRETS,
      },
    },
  ],
};

console.log(yaml.dump(template));
