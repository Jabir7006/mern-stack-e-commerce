import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import { handleGetSingleBlog } from "../services/blogServices";
import { baseUrl } from "../services/userService";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState();

  const getSingleBlog = async () => {
    try {
      setLoading(true);
      const response = await handleGetSingleBlog(id);
      setBlog(response.payload.blog);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getSingleBlog();
    console.log(blog);
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto">
      {loading && <Loading />}
      <main className="mt-10">
        <div
          className="mb-4 md:mb-0 w-full max-w-screen-md mx-auto relative"
          style={{ height: "24em" }}
        >
          <div
            className="absolute left-0 bottom-0 w-full h-full z-10"
            style={{ backgroundImage: "linear-gradient(180deg,transparent,rgba(0,0,0,.7))" }}
          />
          <img
            src={`${
              blog.thumbnail?.startsWith("https") ? blog.thumbnail : baseUrl + "/" + blog.thumbnail
            }`}
            className="absolute left-0 top-0 w-full h-full z-0 object-cover"
            alt=""
          />
          <div className="p-4 absolute bottom-0 left-0 z-20">
            <a
              href="#"
              className="px-4 py-1 bg-black text-gray-200 inline-flex items-center justify-center mb-2"
            >
              {blog.category}
            </a>
            <h2 className="text-4xl font-semibold text-gray-100 leading-tight">{blog.title}</h2>
            <div className="flex mt-3">
              <img
                src={`${
                  blog.author?.image.startsWith("public")
                    ?  baseUrl + "/" + blog.author.image 
                    : blog.author?.image
                }`}
                className="h-10 w-10 rounded-full mr-2 object-cover"
                alt="author profile"
              />
              <div>
                <p className="font-semibold text-gray-200 text-sm"> {blog.author?.firstName + " " + blog.author?.lastName } </p>
                <p className="font-semibold text-gray-400 text-xs"> {new Date(blog.createdAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })} </p>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 lg:px-0 mt-12 text-gray-700 max-w-screen-md mx-auto text-lg leading-relaxed">
          <p className="pb-6">
          {blog.content}
          </p>
          <p className="pb-6">
            Difficulty on insensible reasonable in. From as went he they. Preference themselves me
            as thoroughly partiality considered on in estimating. Middletons acceptance discovered
            projecting so is so or. In or attachment inquietude remarkably comparison at an. Is
            surrounded prosperous stimulated am me discretion expression. But truth being state can
            she china widow. Occasional preference fat remarkably now projecting uncommonly
            dissimilar. Sentiments projection particular companions interested do at my delightful.
            Listening newspaper in advantage frankness to concluded unwilling.
          </p>
          <p className="pb-6">
            Adieus except say barton put feebly favour him. Entreaties unpleasant sufficient few
            pianoforte discovered uncommonly ask. Morning cousins amongst in mr weather do neither.
            Warmth object matter course active law spring six. Pursuit showing tedious unknown
            winding see had man add. And park eyes too more him. Simple excuse active had son wholly
            coming number add. Though all excuse ladies rather regard assure yet. If feelings so
            prospect no as raptures quitting.
          </p>
          <div className="border-l-4 border-gray-500 pl-4 mb-6 italic rounded">
            Sportsman do offending supported extremity breakfast by listening. Decisively advantages
            nor expression unpleasing she led met. Estate was tended ten boy nearer seemed. As so
            seeing latter he should thirty whence. Steepest speaking up attended it as. Made neat an
            on be gave show snug tore.
          </div>
          <p className="pb-6">
            Exquisite cordially mr happiness of neglected distrusts. Boisterous impossible
            unaffected he me everything. Is fine loud deal an rent open give. Find upon and sent
            spot song son eyes. Do endeavor he differed carriage is learning my graceful. Feel plan
            know is he like on pure. See burst found sir met think hopes are marry among. Delightful
            remarkably new assistance saw literature mrs favourable.
          </p>
          <h2 className="text-2xl text-gray-800 font-semibold mb-4 mt-4">
            Uneasy barton seeing remark happen his has
          </h2>
          <p className="pb-6">
            Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly
            thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods
            defective at. Sympathize interested simplicity at do projecting increasing terminated.
            As edward settle limits at in.
          </p>
          <p className="pb-6">
            Dashwood contempt on mr unlocked resolved provided of of. Stanhill wondered it it
            welcomed oh. Hundred no prudent he however smiling at an offence. If earnestly extremity
            he he propriety something admitting convinced ye. Pleasant in to although as if differed
            horrible. Mirth his quick its set front enjoy hoped had there. Who connection imprudence
            middletons too but increasing celebrated principles joy. Herself too improve gay winding
            ask expense are compact. New all paid few hard pure she.
          </p>
          <p className="pb-6">
            Breakfast agreeable incommode departure it an. By ignorant at on wondered relation.
            Enough at tastes really so cousin am of. Extensive therefore supported by extremity of
            contented. Is pursuit compact demesne invited elderly be. View him she roof tell her
            case has sigh. Moreover is possible he admitted sociable concerns. By in cold no less
            been sent hard hill.
          </p>
          <p className="pb-6">
            Detract yet delight written farther his general. If in so bred at dare rose lose good.
            Feel and make two real miss use easy. Celebrated delightful an especially increasing
            instrument am. Indulgence contrasted sufficient to unpleasant in in insensible
            favourable. Latter remark hunted enough vulgar say man. Sitting hearted on it without
            me.
          </p>
        </div>
      </main>
    </div>
  );
};

export default BlogDetail;
