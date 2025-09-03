import type { Schema, Struct } from '@strapi/strapi';

export interface ComponentsImageBlock extends Struct.ComponentSchema {
  collectionName: 'components_components_image_blocks';
  info: {
    displayName: 'Image Block';
    icon: 'folder';
  };
  attributes: {
    caption: Schema.Attribute.String;
    image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
  };
}

export interface ComponentsTextBlock extends Struct.ComponentSchema {
  collectionName: 'components_components_text_blocks';
  info: {
    displayName: 'Text Block';
  };
  attributes: {
    text: Schema.Attribute.Blocks & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'components.image-block': ComponentsImageBlock;
      'components.text-block': ComponentsTextBlock;
    }
  }
}
