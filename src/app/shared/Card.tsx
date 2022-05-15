import React from 'react'

export interface ICardProps {
    title?: string;
    children?: JSX.Element | JSX.Element[];
}

export const Card = (props: ICardProps) => {
    return  <div className="card shadow mb-4">
        {props.title && <div className="card-header py-3 text-center">
            <h6 className="m-0 font-weight-bold text-primary">{props.title}</h6>
        </div>}
        <div className="card-body">
            {props.children}
        </div>
    </div>;
}
