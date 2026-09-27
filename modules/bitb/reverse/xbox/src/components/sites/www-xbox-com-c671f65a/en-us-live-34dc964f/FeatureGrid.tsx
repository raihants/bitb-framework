import Image from "next/image";
import Link from "next/link";

export default function FeatureGrid() {
  const features = [
    {
      image: "/sites/www-xbox-com-c671f65a/en-us-live-34dc964f/images/6217d767-2812-4f94-bcd0-9e3ccd977f45.jpg",
      title: "Connect to XBOX-enabled devices",
      body: "You'll need an account to play games and access other experiences on your XBOX console, Windows PC, and XBOX mobile app. If you don't already have an account, you can create one for free.",
    },
    {
      image: "/sites/www-xbox-com-c671f65a/en-us-live-34dc964f/images/b20a4749-3552-483c-8aeb-b2cd16108fbb.jpg",
      title: "Manage your XBOX profile",
      body: "Edit your gamertag or avatar, update your XBOX settings, find and add friends, and more.",
    },
    {
      image: "/sites/www-xbox-com-c671f65a/en-us-live-34dc964f/images/75f4db50-4fad-4eba-b346-a01d0ab53788.jpg",
      title: "Engage with friends and the XBOX community",
      body: "See what your friends are playing, share game clips, and chat.",
    },
    {
      image: "/sites/www-xbox-com-c671f65a/en-us-live-34dc964f/images/5e4acecc-b3e1-4124-9c93-3ab82b3150b4.jpg",
      title: "Manage your children's console gaming activities",
      body: "Set screen time, update content restrictions, and stay on top of incoming friend requests.",
      link: "LEARN MORE >",
      linkHref: "#",
    },
  ];

  return (
    <section className="bg-[#e2e2e2] pb-12">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col">
              <div className="mb-4">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  width={400}
                  height={225}
                  className="w-full h-auto"
                />
              </div>
              <h3 className="text-[18px] font-semibold text-black mb-2">
                {feature.title}
              </h3>
              <p className="text-[16px] text-black mb-4 flex-grow">
                {feature.body}
              </p>
              {feature.link && (
                <Link
                  href={feature.linkHref || "#"}
                  className="text-[#0a4f0a] font-bold text-[16px] hover:underline hover:decoration-2 mt-auto inline-block"
                >
                  {feature.link}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
