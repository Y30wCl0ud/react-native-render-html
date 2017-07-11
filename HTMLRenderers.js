import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import HTMLStyles from './HTMLStyles';
import HTMLImage from './HTMLImage';

export default {
	/**
	* Renders an anchor tag
	* @param htmlAttribs: dict of html attributes
	* @param children: the children to place within the element
	* @param passProps: other props that are to be passed into the element
	* @return a RN element that represents an anchor tag
	*/
	a: (htmlAttribs, children, passProps) => {
		let type;
		let idType;
		// console.log(htmlAttribs);
		// console.log(htmlAttribs['data-action-id']);
		if (htmlAttribs['data-action-id']) {
			type = 'action';
			idType = htmlAttribs['data-action-id']
		} else if (htmlAttribs['data-acticle-id']) {
			type = 'article';
			idType = htmlAttribs['data-article-id']
		} else if (htmlAttribs['data-inquiry-id']) {
			type = 'inquiry';
			idType = htmlAttribs['data-inquiry-id']
		} else {
			type = ''
			idType = '';
		}

		const style = []
			.concat(
			HTMLStyles.defaultStyles.a,
			passProps.htmlStyles ? passProps.htmlStyles.a : undefined,
			htmlAttribs.style ? HTMLStyles.cssStringToRNStyle(htmlAttribs.style, HTMLStyles.STYLESETS.TEXT) : undefined
			).filter((s) => s !== undefined);

		if (passProps.parentIsText) {
			return (
				<Text
					{...passProps}
					style={style}
					onPress={(evt) => { passProps.onLinkPress ? passProps.onLinkPress(evt, htmlAttribs.href, type, idType) : undefined; }}>
					{children}
				</Text>
			);
		} else {
			return (
				<TouchableOpacity onPress={(evt) => { passProps.onLinkPress ? passProps.onLinkPress(evt, htmlAttribs.href, type, idType) : undefined; }}>
					<Text {...passProps} style={style}>
						{children}
					</Text>
				</TouchableOpacity>
			);
		}
	},
	/**
	* Renders an image tag
	* @param htmlAttribs: dict of html attributes
	* @param children: the children to place within the element
	* @param passProps: other props that are to be passed into the element
	* @return a RN element that represents an image tag
	*/
	img: (htmlAttribs, children, passProps) => {
		// Build our styles
		const style = []
			.concat(
			HTMLStyles.defaultStyles.img,
			passProps.htmlStyles ? passProps.htmlStyles.img : undefined,
			htmlAttribs.style ? HTMLStyles.cssStringToRNStyle(htmlAttribs.style, HTMLStyles.STYLESETS.IMAGE) : undefined
			).filter((s) => s !== undefined);

		return (<HTMLImage source={{ uri: htmlAttribs.src }} style={style} {...passProps} />);
	}
};
