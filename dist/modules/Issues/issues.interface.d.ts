export interface IIssues {
    id: number;
    title: string;
    description: string;
    type: string;
    status: "open" | "in_progress" | "resolved";
    reporter_id: number;
}
export interface IQuery {
    sort?: string;
    type?: string;
    status?: string;
}
//# sourceMappingURL=issues.interface.d.ts.map