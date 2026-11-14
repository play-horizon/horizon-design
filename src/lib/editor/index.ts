/**
 * `horizon-design/editor`: the components of horizon-editor's Editor window, apart from the
 * general kit. The hierarchy view, the inspector, the file tree, the docking layout wrapper
 * (horizon-layout), and Monaco's theme. Milestone U6 adds the timeline, console, property grid,
 * vector, gradient and curve inputs, the asset preview and the xyflow and Blockly theming.
 * @module
 */
export * from './hierarchy-view';
export * from './inspector-panel';
export * from './file-tree';
export * from './horizon-layout';
export { createMonacoTheme, type MonacoThemeData } from './monaco-theme';
