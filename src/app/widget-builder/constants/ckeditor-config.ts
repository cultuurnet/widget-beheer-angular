/**
 * Provides configuration for different types of CkEditor instances
 */
export const ckeditorConfig = {
  basic_html: {
    toolbarGroups: [
      { name: 'document', groups: ['mode', 'document', 'doctools'] },
      { name: 'clipboard', groups: ['undo', 'clipboard'] },
      { name: 'styles', groups: ['styles'] },
      { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
      {
        name: 'editing',
        groups: ['find', 'selection', 'spellchecker', 'editing'],
      },
      '/',
      {
        name: 'paragraph',
        groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'],
      },
      { name: 'links', groups: ['links'] },
      { name: 'insert', groups: ['insert'] },
      { name: 'forms', groups: ['forms'] },
      { name: 'tools', groups: ['tools'] },
      { name: 'others', groups: ['others'] },
      { name: 'colors', groups: ['colors'] },
      { name: 'about', groups: ['about'] },
    ],
    removeButtons:
      'Underline,Subscript,Superscript,Cut,Copy,PasteText,Paste,PasteFromWord,Scayt,Styles,Strike,RemoveFormat,Blockquote,Anchor,About,SpecialChar,HorizontalRule,Maximize',
    removeDialogFields:
      'image:info:txtBorder;image:info:txtHSpace;image:info:txtVSpace;image:info:txtHSpace',
    image_previewText: ' ',
    filebrowserUploadUrl: '/upload',
    allowedContent: true,
  },
};
