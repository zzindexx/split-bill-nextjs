import React from 'react';
import { Participant } from '../../store/types';

export const ParticipantBlock: React.FC<Participant> = (participant: Participant) => {
    return <span key={participant.id}>
        <i className="bi bi-person me-2"></i>
        {participant.name}
    </span>
}