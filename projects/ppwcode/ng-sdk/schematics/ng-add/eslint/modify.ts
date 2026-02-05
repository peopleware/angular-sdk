import { Tree } from '@angular-devkit/schematics'

/**
 * Modifies the generated eslint.config.js file to include extra rules.
 */
export const modifyESLintConfig = () => {
    return (host: Tree) => {
        const eslintConfigPath = 'eslint.config.js'
        if (!host.exists(eslintConfigPath)) {
            return host
        }

        const eslintConfigContent = host.read(eslintConfigPath)?.toString('utf-8')
        if (!eslintConfigContent) {
            return host
        }

        const htmlRulesBlockRegex = /(files:\s*\[\s*['"]\*\*\/\*\.html['"]\s*\],[\s\S]*?rules:\s*\{)([\s\S]*?)\}/
        const match = eslintConfigContent.match(htmlRulesBlockRegex)

        if (match) {
            const [fullMatch, prefix, existingRules] = match
            if (existingRules.includes('@angular-eslint/template/prefer-control-flow')) {
                return host
            }
            let updatedRules = existingRules.trim()
            if (updatedRules) {
                if (!updatedRules.endsWith(',')) {
                    updatedRules += ','
                }
                updatedRules += '\n      "@angular-eslint/template/prefer-control-flow": "error"\n    '
            } else {
                updatedRules = '\n      "@angular-eslint/template/prefer-control-flow": "error"\n    '
            }

            const updatedContent = eslintConfigContent.replace(fullMatch, `${prefix}${updatedRules}}`)
            host.overwrite(eslintConfigPath, updatedContent)
        }

        return host
    }
}
