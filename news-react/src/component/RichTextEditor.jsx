import * as React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function RichTextEditor() {
    return (
        <div className="App">
            <CKEditor
                editor={ClassicEditor}
                data=""
                onChange={(event, editor) => {
                    const data = editor.getData();
                    console.log({ event, editor, data });
                }}
            />
        </div>
    );
}