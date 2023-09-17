import React, { useEffect, useState } from "react";

const Home = () => {
  const [allRegCourses, setAllRegCourses] = useState([]);
  const [selectedAllCourses, setSelectedAllCourses] = useState([]);
  const [totalCreditHour, setTotalCreditHour] = useState(20); 
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetch("./Courses.json")
      .then((res) => res.json())
      .then((data) => setAllRegCourses(data));
  }, []);

  const handleSelect = (course) => {
    
    // Check if adding the course would exceed the total credit hours
    if (totalCreditHour - course.credit < 0) {
      alert("Adding this course would exceed the total credit hours!");
      return;
    }
    // Check if the course is already selected
    if (selectedAllCourses.some((selectedCourse) => selectedCourse.id === course.id)) {
      alert("Course is already selected!");
      return;
    }

    // Update the selected courses and total credit hours
    const updatedSelectedCourses = [...selectedAllCourses, course];
    setSelectedAllCourses(updatedSelectedCourses);
    updateTotalCreditHour(updatedSelectedCourses);
    updateTotalPrice(updatedSelectedCourses);
  };

  const updateTotalCreditHour = (courses) => {
    const totalCredit = courses.reduce((total, course) => total + course.credit, 0);
    setTotalCreditHour(20 - totalCredit); // Update the remaining credit hours
  };

  const updateTotalPrice = (courses) => {
    const totalPrice = courses.reduce((total, course) => total + course.price, 0);
    setTotalPrice(totalPrice);
  };

  return (
    <div className="flex wrap justify">
      <section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {allRegCourses.map((course) => (
            <div key={course.id}>
              <div className="bg-white p-3 text-center p-4 rounded-xl">
                <div className="bg-gray-100 flex justify-center items-center">
                  <img src={course.image} alt=""></img>
                </div>
                <div>
                  <h3 className="font-semibold pt-3 pb-3">{course.title}</h3>
                </div>
                <div>
                  <p className="text-sm text-gray-40 text-justify text-gray-500">
                    {course.shortDetails}
                  </p>
                </div>

                <div className="flex justify-between pt-4 pb-4">
                  <div className="flex gap-3">
                    <img
                      src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='16' viewBox='0 0 14 16' fill='none'%3E%3Cpath d='M12 1H4.5C3.57174 1 2.6815 1.36875 2.02513 2.02513C1.36875 2.6815 1 3.57174 1 4.5C1 5.42826 1.36875 6.3185 2.02513 6.97487C2.6815 7.63125 3.57174 8 4.5 8H9.5C10.4283 8 11.3185 8.36875 11.9749 9.02513C12.6313 9.6815 13 10.5717 13 11.5C13 12.4283 12.6313 13.3185 11.9749 13.9749C11.3185 14.6313 10.4283 15 9.5 15H1' stroke='%231C1B1B' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"
                      alt="Price Icon"
                    />
                    <h3 className="text-gray-500 font-medium">
                      Price: {course.price}
                    </h3>
                  </div>
                  <div className="flex gap-3">
                    <img
                      src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M12 6.04201C10.3516 4.56337 8.2144 3.74695 6 3.75001C4.948 3.75001 3.938 3.93001 3 4.26201V18.512C3.96362 18.172 4.97816 17.9989 6 18C8.305 18 10.408 18.867 12 20.292M12 6.04201C13.6483 4.56328 15.7856 3.74686 18 3.75001C19.052 3.75001 20.062 3.93001 21 4.26201V18.512C20.0364 18.172 19.0218 17.9989 18 18C15.7856 17.997 13.6484 18.8134 12 20.292M12 6.04201V20.292' stroke='%231C1B1B' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"
                      alt="Credit Icon"
                    />
                    <h3 className="text-black">Credit: {course.credit}hr</h3>
                  </div>
                </div>

                <div>
                  <button
                    className="w-full bg-blue-500 text-white round-5"
                    onClick={() => handleSelect(course)}
                  >
                    Select
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="w-8/12 ml-5 p-4 bg-white rounded-md h-96 rounded-xl">
        <div>
          <div>
            <h3 className="pb-4 text-blue-500 font-bold text-lg">
              Credit Hour Remaining <span>{totalCreditHour} hr</span>
            </h3>
            {totalCreditHour < 0 && (
              <p>Alert: Total credit hours are less than 0!</p>
            )}
            <hr />
          </div>
          <div>
            <h2 className="pb-4 pt-3 text-xl font-extrabold text-black">
              Course Names
            </h2>
            {selectedAllCourses.length > 0 ? (
              <ol className="list-decimal ml-5">
                {selectedAllCourses.map((course, index) => (
                  <li className="text-black" key                  ={course.id}>{course.title}</li>
                ))}
              </ol>
            ) : (
              <p className="text-black">No courses selected</p>
            )}
            <hr />
          </div>

          <div>
            <h3 className="pb-3 pt-3 font-bold text-gray-600">
              Total Credit Hour : <span>{totalCreditHour} hr</span>
            </h3>
            <hr />
          </div>
          <div>
            <h3 className="font-bold pb-3 pt-3 text-gray-600">
              Total Price <span>{totalPrice} USD</span>
            </h3>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;