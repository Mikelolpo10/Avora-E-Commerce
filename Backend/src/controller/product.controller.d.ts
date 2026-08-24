import type { Request, Response } from 'express';
interface CategoryParams {
    category: string;
}
export declare const getProductsByCategories: (req: Request<CategoryParams>, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getProductsByDepartment: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getProductBySlug: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getSimilarProducts: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export {};
//# sourceMappingURL=product.controller.d.ts.map