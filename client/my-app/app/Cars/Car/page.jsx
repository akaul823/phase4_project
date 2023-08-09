export default function Car({car}){
    console.log(car.pictures)
    return(
        <div key={car.id} className="group relative">
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
            <img
              src={`http://127.0.0.1:5555/static${car.pictures}/1.jpeg`}
              alt={car.car_make + car.car_model}
              className="h-full w-full object-cover object-center lg:h-full lg:w-full"
            />
          </div>
          <div className="mt-4 flex justify-between">
            <div>
              <h3 className="text-sm text-gray-700">
                {/* <a href={car.car_make}>
                  <span aria-hidden="true" className="absolute inset-0" />
                  {car.car_make + " " + car.car_model}
                </a> */}
              </h3>
              {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
            </div>
            <p className="text-sm font-medium text-gray-900">
              {car.listed_price + " $"}
            </p>
          </div>
        </div>
      )
}