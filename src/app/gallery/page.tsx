import Image from "next/image";
import { GalleryTrinkets } from "@/components/gallery-trinkets";
import { TapedPhoto } from "@/components/taped-photo";
import { NARISS_BADGE_INK, NARISS_DEEP_BLUE, NARISS_PAPER } from "@/lib/colors";
import { GALLERY_IMAGES } from "@/lib/gallery-images";

export default function GalleryPage() {
  return (
    <main className="relative isolate overflow-hidden" style={{ backgroundColor: NARISS_PAPER }}>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          backgroundImage: "url('/bg texture.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <GalleryTrinkets />

      <section className="relative flex flex-col items-center px-6 pt-40 pb-16 text-center">
        {/* <p
          className="font-serif text-xs tracking-[0.5em] uppercase"
          style={{ color: NARISS_DEEP_BLUE }}
        >
          A Fairy Tale in Stills
        </p> */}
        <h1
          className="mt-4 font-serif text-4xl md:text-6xl"
          style={{ color: NARISS_BADGE_INK }}
        >
          The Nariss Grimoire
        </h1>
        {/* <p
          className="mt-5 max-w-xl font-serif italic opacity-70"
          style={{ color: NARISS_BADGE_INK }}
        >
          Once, beneath a moon that never rose the same way twice, a girl with
          a borrowed tail began writing herself into a story that wasn&apos;t
          finished yet — every page since torn loose and pinned back up here.
        </p> */}
        <Image
          src="/asset3.png"
          alt=""
          aria-hidden
          width={140}
          height={264}
          className="mt-6 h-24 w-auto opacity-80"
        />
      </section>

      <section className="px-4 pb-28 sm:px-8">
        <div className="mx-auto max-w-6xl columns-1 gap-x-8 sm:columns-2 lg:columns-3">
          {GALLERY_IMAGES.map((image, index) => (
            <TapedPhoto key={image.src} {...image} index={index} />
          ))}
        </div>
      </section>

    </main>
  );
}
