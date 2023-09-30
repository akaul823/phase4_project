import Link from "next/link";

function CarLink({ car }) {
  return (
    <Link href={`/Cars/${car.id}/`}>
      <div className="group relative">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
          <img
            src={car.pictures}
            alt={car.car_make + car.car_model}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">
              <span aria-hidden="true" className="absolute inset-0" />
              {car.car_make + " " + car.car_model}
            </h3>
          </div>
          <p className="text-sm font-medium text-gray-900">
            {car.listed_price + " $"}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default CarLink;
