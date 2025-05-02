const ambiente_desenvolvimento = 'desenvolvimento';

const caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';

require("dotenv").config({ path: caminho_env });