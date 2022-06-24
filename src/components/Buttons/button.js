import React from 'react';
import MUIButton from '@mui/material/Button';

function Button({
	label,
	variant,
	size,
	onClick
}) {
	return (
		<MUIButton
			variant={variant}
			size={size}
			onClick={onClick}
		>
			{label}
		</MUIButton>
	);
}

Button.defaultProps = {
	label:'',
	variant:'text',
	size:'small',
	onClick:()=>{}
}

export default Button;