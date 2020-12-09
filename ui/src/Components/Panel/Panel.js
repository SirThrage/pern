import React from 'react';

import './Panel.scss';

export const Panel = ({ className, ...props }) => <div className={ `panel${ className ? ` ${ className }` : '' }` } { ...props } />;
