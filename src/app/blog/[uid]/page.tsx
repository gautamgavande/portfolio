import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/prismicio";
import ContentBody from "@/components/ContentBody";

type Params = { uid: string };

export default async function Page({ params }: { params: Params }) {
    const client = createClient();
    const page = await client
        .getByUID("blog_post", params.uid)
        .catch(() => notFound());


//     function formatDate(date: DateField) {
//         if (isFilled.date(date)) {
//             const dateOptions: Intl.DateTimeFormat = {
//                 weekday: "long",
//                 year: "numeric",
//                 month: "long",
//                 day: "numeric"
//             }
//             return new Intl.DateTimeFormat("en-US",dateOptions).format(new Date(date))
//         }

//     }
//    const formattedDate=formatDate(page.data.date)

    return (
        // <Bounded as="article">
        //     <div className="rounded-2xl border-2 border-slate-800 bg-slate-900 px-4 py-10 md:px-8 md:py-20">
        //         <Heading as="h1">{page.data.title}</Heading>
        //         <div className="flex gap-4 text-yellow-400 text-xl font-bold">
        //             {page.tags.map((tag) => (
        //                 <span key={tag}>{tag}</span>
        //             ))}
        //         </div>
        //         <p className="mt-8 border-b border-slate-600 text-xl font-medium text-slate-300">
        //             {formattedDate}
        //         </p>
        //         <div className="prose prose-lg prose-invert mt-12 w-full max-w-none md:mt-20"> 
        //         <SliceZone slices={page.data.slices} components={components} />;
        //         </div>
        //     </div>
        // </Bounded>
        <ContentBody page={page}></ContentBody>
    )
}

export async function generateMetadata({
    params,
}: {
    params: Params;
}): Promise<Metadata> {
    const client = createClient();
    const page = await client
        .getByUID("blog_post", params.uid)
        .catch(() => notFound());

    return {
        title: page.data.meta_title,
        description: page.data.meta_description,
    };
}

export async function generateStaticParams() {
    const client = createClient();
    const pages = await client.getAllByType("blog_post");

    return pages.map((page) => {
        return { uid: page.uid };
    });
}
