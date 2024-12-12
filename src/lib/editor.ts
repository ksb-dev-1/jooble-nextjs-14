import { EditorState, convertToRaw, convertFromRaw } from "draft-js";

export const serializeEditorState = (editorState: EditorState): string => {
  const contentState = editorState.getCurrentContent();
  const raw = convertToRaw(contentState);
  return JSON.stringify(raw);
};

export const deserializeEditorState = (serialized: string): EditorState => {
  try {
    const raw = JSON.parse(serialized);
    const contentState = convertFromRaw(raw);
    return EditorState.createWithContent(contentState);
  } catch {
    return EditorState.createEmpty();
  }
};
