import { Request, Response } from "express";
import { prisma } from "../prisma/client";

export const getPosts = async (req: Request, res: Response) => {
    const {
        sortBy,
        order,
        limit,
        offset,
        categoryName // Menangkap parameter query untuk filter
    } = req.query;

    const limitNum = Number(limit) || 10;
    const offsetNum = Number(offset) || 0;
    const orderBy: any = {};

    if (sortBy) {
        if (sortBy !== 'nameCategory') {
            orderBy[sortBy as string] = (order as 'asc' | 'desc') || 'asc';
        }
    }

    try {
        const posts = await prisma.post.findMany({
            where: {
                categorys: {
                    some: {
                        category: {
                            nameCategory: categoryName as string
                        }
                    }
                }
            },
            include: {
                categorys: {
                    include: {
                        category: true
                    }
                }
            },
            orderBy: orderBy,
            take: limitNum,
            skip: offsetNum,
        });


        const total = await prisma.post.count({
            where: {
                categorys: {
                    some: {
                        category: {
                            nameCategory: categoryName as string
                        }
                    }
                }
            }
        });

        res.status(200).json({
            message: "success get data posts",
            data: posts,
            total
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "error saat mengambil data posts",
            error: (error as Error).message
        });
    }
};


export const getCommentOnPost = async (req: Request, res: Response) => {
    const {
        sortBy,
        order,
        limit,
        offset,
    } = req.query;

    const postId = req.params.id


    const itemPerPage: number = Number(limit) || 10
    const pageNumber: number = Number(offset) || 1

    const skipValue: number = Number((pageNumber - 1) * itemPerPage)

    try {
        const commentPosts = await prisma.comment.findMany({
            where: {
                postId: Number(postId)
            },
            orderBy: {
                [sortBy as string]: order as "asc" || "desc"
            },
            take: itemPerPage,
            skip: skipValue,
        });


        const total = await prisma.comment.count({
            where: {
                postId: Number(postId)
            }
        });

        res.status(200).json({
            message: "success get data posts",
            data: commentPosts,
            total
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "error saat mengambil data posts",
            error: (error as Error).message
        });
    }
};


export const getCommentSummary = async (req: Request, res: Response) => {
    const {
        sortBy,
        order,
        limit,
        offset,
        minTotalComment
    } = req.query;

    const orderBy: any = {};

    if (sortBy) {
        if (sortBy !== 'nameCategory') {
            orderBy[sortBy as string] = (order as 'asc' | 'desc') || 'asc';
        }
    }



    const itemPerPage: number = Number(limit) || 10
    const pageNumber: number = Number(offset) || 1

    const skipValue: number = Number((pageNumber - 1) * itemPerPage)
    const orderParam: 'asc' | 'desc' = order === 'desc' ? 'desc' : 'asc'
    try {
        const commentSummary = await prisma.comment.groupBy({
            by: ["postId"],
            _count: {
                _all: true
            },
            having: {
                postId: {
                    _count: {
                        gt: Number(minTotalComment) || 1,
                    },
                },
            },
            orderBy: {
                postId: orderParam
            },
            take: itemPerPage,
            skip: skipValue
        });

        res.status(200).json({
            message: "success get data posts",
            data: commentSummary,
            pagination:{
                itemPerPage,
                pageNumber
            },
            total: commentSummary.length
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "error saat mengambil data posts",
            error: (error as Error).message
        });
    }
};
