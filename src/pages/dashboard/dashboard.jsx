export default function Dashboard() {
  return (
    <>
      <div className="d-flex bg-info text-white p-2 align-items-center">
        <div className="d-flex mx-auto">
          <p className="px-2">movies</p>
          <p className="px-2">theatres</p>
          <p className="px-2">stream</p>
          <p className="px-2">live concerts</p>
          <p className="px-2">plays</p>
        </div>
        <div className="d-flex">
          <p className="px-2">list your show</p>
          <p className="px-2">get offers</p>
          <p className="px-2">help</p>
          <p className="px-2">contact us</p>
          <p className="px-2">about us</p>
        </div>
      </div>
      <div className="container"></div>
    </>
  );
}
