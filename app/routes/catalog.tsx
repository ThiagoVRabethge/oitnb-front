import { Link } from "react-router-dom";
import useCatalogStore from "~/store/catalogStore";

const Catalog = () => {
  const catalog = useCatalogStore((state: any) => state.catalog)

  console.log(catalog)

  return (
    <>
      <Link to="/" className="btn btn-ghost m-4 p-4">
        Back
      </Link>

      {
        catalog && catalog.map((item: any) => (
          <div key={item.id} className="card m-4 p-4 border-2 border-gray-300">
            <h2 className="text-lg font-bold">{item.name}</h2>
            <p>{item.sinopsis}</p>
          </div>
        ))
      }
    </>
  )
}

export default Catalog;