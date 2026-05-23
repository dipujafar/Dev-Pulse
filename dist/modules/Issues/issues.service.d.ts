import type { IIssues, IQuery } from "./issues.interface.js";
export declare const issuesService: {
    createIssueIntoDB: (payload: IIssues, userId: string) => Promise<any>;
    getAllIssuesFromDB: (query: IQuery) => Promise<{
        id: any;
        title: any;
        description: any;
        type: any;
        status: any;
        reporter: {} | null;
        created_at: any;
        updated_at: any;
    }[]>;
    getSingleIssueFromDB: (id: string) => Promise<any>;
    updateIssueIntoDB: (payload: IIssues, id: string, userId: string) => Promise<any>;
    deleteIssueFromDB: (id: string) => Promise<import("pg").QueryResult<any>>;
};
//# sourceMappingURL=issues.service.d.ts.map