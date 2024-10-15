export default function AboutUs() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full h-[300px] flex items-center justify-center  text-black p-4">
        <h1 className="text-6xl font-bold text-center font-Script mt-20">
          RS Shop
        </h1>
      </div>

      <div className="max-w-screen-md text-center my-10 px-6">
        <h2 className="text-3xl font-bold mb-4 text-black">Who We Are</h2>
        <p className="text-xl text-gray-700">
          Welcome to <span className="font-Script font-bold">RS Shop</span>,
          your go-to destination for a diverse range of products including
          clothing, electronics, accessories, and more. We offer everything you
          need in one convenient place, ensuring quality, affordability, and
          reliability in every purchase.
        </p>
        <p className="text-xl text-gray-700 mt-2">
          At <span className="font-Script font-bold">RS Shop</span>, we believe
          in providing high-quality products at competitive prices. Our mission
          is to make shopping easy, convenient, and accessible for everyone.
          With a diverse range of products sourced through trusted suppliers, we
          are dedicated to delivering an exceptional shopping experience right
          to your fingertips.
        </p>
      </div>

      <div className="max-w-screen-md text-center my-10 px-6">
        <h2 className="text-3xl font-bold text-black mb-4">Why Choose Us?</h2>
        <p className="text-xl text-gray-700 mb-6">
          At RS Shop, we are committed to providing:
        </p>
        <ul className="text-left list-disc list-inside text-gray-700 space-y-2 text-base">
          <li>High-quality products from trusted sources</li>
          <li>Competitive pricing to ensure you get the best deal</li>
          <li>Fast, reliable shipping to your doorstep</li>
          <li>Exceptional customer service available 24/7</li>
          <li>A seamless shopping experience tailored to your needs</li>
        </ul>
      </div>

      <div className="max-w-screen-md text-center my-10 px-6">
        <p className="text-xl text-gray-700 mb-6">
          This store is powered by FakeStoreAPI, a publicly available API that
          generates product information for testing and development purposes. It
          allows developers to create mock e-commerce platforms, showcasing
          functionality without relying on real products or inventories.
        </p>
        <p className="text-xl text-gray-700 mb-6">
          This project is also a partial fulfillment of the Codebility Trainee
          Program, where I, as a trainee, have built this store to demonstrate
          skills in modern web development using technologies like Next.js,
          Tailwind CSS, TypeScript, and more.
        </p>
        <p className="text-xl text-gray-700 mb-6">
          Thank you for visiting{' '}
          <span className="font-Script font-bold">RS Shop</span>, where
          innovation meets learning, and quality meets convenience. I hope you
          enjoy your experience here as I continue to grow as a developer and
          improve the store.
        </p>
      </div>
    </div>
  );
}
