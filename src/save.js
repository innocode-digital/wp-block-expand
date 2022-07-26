import { RichText, useBlockProps, InnerBlocks } from '@wordpress/block-editor';

import { BLOCK_CLASS_NAME } from './constants';
import {
	INTRO_ALIGNMENT_DEFAULT,
	BUTTON_TYPE_DEFAULT,
	BUTTON_MORE_TEXT_DEFAULT,
	BUTTON_LESS_TEXT_DEFAULT,
	HAS_FADEOUT_DEFAULT,
	FADEOUT_HEIGHT_DEFAULT,
	ALLOWED_BLOCKS,
} from './constants/editor';

export default function save({ attributes }) {
	const {
		intro,
		introAlignment = INTRO_ALIGNMENT_DEFAULT,
		buttonType = BUTTON_TYPE_DEFAULT,
		buttonMoreText = BUTTON_MORE_TEXT_DEFAULT,
		buttonLessText = BUTTON_LESS_TEXT_DEFAULT,
		hasFadeout = HAS_FADEOUT_DEFAULT,
		fadeoutHeight = FADEOUT_HEIGHT_DEFAULT,
	} = attributes;

	let className = `${BLOCK_CLASS_NAME} ${BLOCK_CLASS_NAME}_is-closed`;

	if (hasFadeout) {
		className += ` ${BLOCK_CLASS_NAME}_has-fadeout`;
	}

	let introClassName = `${BLOCK_CLASS_NAME}__intro`;

	if (introClassName !== 'none') {
		introClassName += ` ${BLOCK_CLASS_NAME}__intro_${introAlignment}`;
	}

	return (
		<div {...useBlockProps.save({ className })}>
			<div className={`${BLOCK_CLASS_NAME}__header`}>
				<RichText.Content
					tagName="div"
					multiline="p"
					value={intro}
					className={introClassName}
					style={{ '--fadeout-height': `${fadeoutHeight}px` }}
				/>
			</div>
			<div className={`${BLOCK_CLASS_NAME}__main`}>
				<button
					type="button"
					className={`${BLOCK_CLASS_NAME}__button ${BLOCK_CLASS_NAME}__button_more ${BLOCK_CLASS_NAME}__button_${buttonType}`}
				>
					{buttonMoreText}
				</button>
				<div className={`${BLOCK_CLASS_NAME}__content`}>
					<InnerBlocks.Content allowedBlocks={ALLOWED_BLOCKS} />
				</div>
				<button
					type="button"
					className={`${BLOCK_CLASS_NAME}__button ${BLOCK_CLASS_NAME}__button_less ${BLOCK_CLASS_NAME}__button_${buttonType}`}
				>
					{buttonLessText}
				</button>
			</div>
		</div>
	);
}
