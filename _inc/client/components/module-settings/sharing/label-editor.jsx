/**
 * External dependencies
 */
import React from 'react';
import classNames from 'classnames';
import { translate as __ } from 'i18n-calypso';

var SharingButtonsLabelEditor = module.exports = React.createClass( {
	displayName: 'SharingButtonsLabelEditor',

	propTypes: {
		active: React.PropTypes.bool,
		value: React.PropTypes.string,
		onChange: React.PropTypes.func,
		onClose: React.PropTypes.func,
		hasEnabledButtons: React.PropTypes.bool
	},

	statics: {
		closeKeyCodes: [
			13, // Return
			27  // Escape
		]
	},

	getDefaultProps: function() {
		return {
			active: false,
			value: '',
			onChange: function() {},
			onClose: function() {},
			hasEnabledButtons: true
		};
	},

	onKeyDown: function( event ) {
		if ( -1 !== SharingButtonsLabelEditor.closeKeyCodes.indexOf( event.keyCode ) ) {
			event.target.blur();
			event.preventDefault();
			this.props.onClose();
		}
	},

	onInputChange: function( event ) {
		this.props.onChange( event.target.value );
	},

	getNoButtonsNoticeElement: function() {
		if ( ! this.props.hasEnabledButtons ) {
			return (
				<em className="sharing-buttons-preview__panel-notice">
					{ __( 'This text won\'t appear until you add at least one sharing button.', {
						context: 'Sharing: Buttons'
					} ) }
				</em>
			);
		}
	},

	render: function() {
		var classes = classNames( 'sharing-buttons-preview__panel', 'is-top', 'sharing-buttons-label-editor', {
			'is-active': this.props.active
		} );

		return (
			<div className={ classes }>
				<div className="sharing-buttons-preview__panel-content">
					<h3 className="sharing-buttons-preview__panel-heading">
						{ __( 'Edit label text', { context: 'Sharing: buttons' } ) }
					</h3>
					<p className="sharing-buttons-preview__panel-instructions">
						{ __( 'Change the text of the sharing buttons label' ) }
					</p>
					<input type="text" value={ this.props.value } onKeyDown={ this.onKeyDown } onChange={ this.onInputChange } className="sharing-buttons-label-editor__input" />
					{ this.getNoButtonsNoticeElement() }
				</div>
				<footer className="sharing-buttons-preview__panel-actions">
					<button type="button" className="button" onClick={ this.props.onClose }>{ __( 'Close' ) }</button>
				</footer>
			</div>
		);
	}
} );