import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  {
    plugins: {
      "simple-import-sort": (await import("eslint-plugin-simple-import-sort")).default,
    },
    rules: {
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^react", "^next"],
            ["^@?\\w"],
            ["^@/types"],
            ["^@/config"],
            ["^@/lib"],
            ["^@/hooks"],
            ["^@/components/ui"],
            ["^@/components"],
            ["^@/registry"],
            ["^@/styles"],
            ["^@/app"],
            ["^\\u0000"],
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
            ["^.+\\.s?css$"]
          ]
        }
      ],
      "simple-import-sort/exports": "error"
    }
  }
];

export default eslintConfig;
