import React from 'react';
import { createFromIconfontCN } from '@ant-design/icons';
import { IconFontProps } from '@ant-design/icons/lib/components/IconFont'

const IconFontCN = createFromIconfontCN({
	// scriptUrl: '//at.alicdn.com/t/font_2717960_zvh1qlvpq7.js',
	scriptUrl: 'https://at.alicdn.com/t/font_2717960_zvh1qlvpq7.js?spm=a313x.7781069.1998910419.251&file=font_2717960_zvh1qlvpq7.js'
});



const IconFont = (props: IconFontProps) => {
	return <IconFontCN {...props} />;
}

export default IconFont;