import { Skill } from './skill.model';

export class Task {
    constructor(
        public id: number,
        public name: string,
        public difficulty: number,
        public description?: string,
        public expValue?: number,
        public goldValue?: number,
        public dueDate?: Date,
        public skills?: Skill[]
    ) {}
}
