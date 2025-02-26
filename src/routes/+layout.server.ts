import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const load: LayoutServerLoad = async (event) => {

    const session = await event.locals.auth();

    //console.log("session", session);
    if(event?.route?.id?.toString() === "/about") {
        console.log("route is about");
        if (!session?.user) throw redirect(303, '/login');
    }

    if (!session?.user?.id) {
        return {
            session
        };
    }

    return {
        session
    };
};