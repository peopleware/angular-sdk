import { SchematicsException, Tree } from '@angular-devkit/schematics'
import { virtualFs, workspaces } from '@angular-devkit/core'

/**
 * Creates a WorkspaceHost based on the current Tree.
 * @param tree The current tree.
 */
export function createHost(tree: Tree): workspaces.WorkspaceHost {
    return {
        async readFile(path: string): Promise<string> {
            const data = tree.read(path) as ArrayBuffer | null
            if (!data) {
                throw new SchematicsException('File not found.')
            }
            return virtualFs.fileBufferToString(data)
        },
        async writeFile(path: string, data: string): Promise<void> {
            return tree.overwrite(path, data)
        },
        async isDirectory(path: string): Promise<boolean> {
            return !tree.exists(path) && tree.getDir(path).subfiles.length > 0
        },
        async isFile(path: string): Promise<boolean> {
            return tree.exists(path)
        }
    }
}
