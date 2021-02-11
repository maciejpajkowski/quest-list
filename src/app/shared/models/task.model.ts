import { Skill } from './skill.model';

export class Task {
    constructor(
        public name: string,
        public difficulty: number,
        public description?: string,
        public expValue?: number,
        public goldValue?: number,
        public dueDate?: Date,
        public overdue?: boolean,
        public skills?: Skill[]
    ) {}
}
