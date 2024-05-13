import { Fragment } from "react";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaPhoneVolume, FaU } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { ImBriefcase } from "react-icons/im";
import { FaGear } from "react-icons/fa6";
import NarBar from "../components/NavBarComponent";
import { GiSkills } from "react-icons/gi";
import { FaUniversity } from "react-icons/fa";

function Profile() {
  return (
    <Fragment>
      <NarBar></NarBar>
      <div className="container text-center" style={{ width: "80%" }}>
        <div className="row mt-4">
          <p className="fw-bolder fs-1">LE TRONG DUONG</p>
          <p className="fs-5 mb-4">BACKEND DEVELOPER</p>
          {/* <div className="row justify-content-center mb-4 ">
            <a
              className="col-1 "
              href="https://www.linkedin.com/in/d%C6%B0%C6%A1ng-l%C3%AA-021a692b0/"
            >
              <FaLinkedin style={{ fontSize: "24px" }} />
            </a>
            <a className="col-1" href="https://github.com/DwngLee">
              <FaGithub style={{ fontSize: "24px" }} />
            </a>
          </div> */}
          <hr></hr>
          <div className="row justify-content-center">
            <p className="col-2  d-flex align-items-center">
              <FaPhoneVolume className="mx-2" />
              0969975702
            </p>
            <p className="col-2  d-flex align-items-center">
              <IoIosMail className="mx-2" />
              duongle157.work@gmail.com
            </p>
          </div>

          <hr></hr>
          {/* --------------------------------------------------------------------- */}
          <div className="row mt-4 justify-content-between">
            <div className="col-7 text-start">
              <p className="fs-4 fw-bold d-flex align-items-center">
                <FaUserCircle className="me-2" />
                About me
              </p>
              <p className="mb-4">
                I am currently a senior student majoring in Multimedia
                Technology at the Posts and Telecommunications Institute of
                Technology
              </p>
              <hr></hr>
              {/* --------------------------------------------------------------------------------- */}
              <p className="fs-4 fw-bold d-flex align-items-center">
                <ImBriefcase className="me-2" />
                Project
              </p>
              <div className="mb-5">
                <a
                  className="fs-5 fw-semibold"
                  href="https://github.com/DwngLe/web_btl_edulearning_2"
                >
                  Website ELearning (Student Project)
                </a>
                <p className="fs-5 ">Overview</p>
                <ul>
                  <li>
                    This website allows users to view and pay to participate in
                    courses. Users can watch videos and lectures in each lesson.
                    Administrators can view course statistics and perform course
                    CRUD operations. All videos and lectures are saved to the
                    server
                  </li>
                </ul>
                <p className="fs-5 ">Technologies used</p>
                <ul>
                  <li>Jakarta Server Pages (JSP)</li>
                  <li>Java Servlet</li>
                  <li>MySQL</li>
                  <li>AWS Server</li>
                </ul>
                <p className="fs-5">My role in team</p>
                <ul>
                  <li>Team lead</li>
                  <li>System analysis design and database design</li>
                  <li>
                    Works in both Font-End and Back-End. Set permissions for the
                    website
                  </li>
                </ul>
              </div>

              <div className="mb-5">
                <a
                  className="fs-5 fw-semibold"
                  href="https://github.com/hhd182/LTG_15-12"
                >
                  Indie 2D Game "Indiana Smith's Adventure" (Student Project)
                </a>
                <p className="fs-5 ">Overview</p>
                <ul>
                  <li>
                    An offline 2D action adventure game for desktop. Players use
                    flashlights to destroy monsters and find a way out of the
                    maze. The ending of the game depends on the player's choice
                    for each question in the game
                  </li>
                </ul>
                <p className="fs-5 ">Technologies used</p>
                <ul>
                  <li>Unity</li>
                  <li>Adobe Photoshop, Adobe Illustrator</li>
                </ul>
                <p className="fs-5 ">My role in team</p>
                <ul>
                  <li>Team lead</li>
                  <li>
                    Works on UI, Sound, Camera, and logic for the light in game.
                    Improve and optimize game performance
                  </li>
                  <li>Testing</li>
                </ul>
              </div>

              <div>
                <a
                  className="fs-5 fw-semibold"
                  href="https://github.com/DwngLe/HotelBooking_Group_02_Ver2"
                >
                  Android App "Hotel Booking" (Student Project)
                </a>
                <p className="fs-5 ">Overview</p>
                <ul>
                  <li>
                    An online booking application on Android devices. Users can
                    view room information, view available room schedules, book
                    rooms and pay for rooms. Users can also register as managers
                    to sell rooms for rent and view room revenue statistics.
                  </li>
                </ul>
                <p className="fs-5 ">Technologies used</p>
                <ul>
                  <li>Spring boot</li>
                  <li>MySQL</li>
                  <li>Android Studio</li>
                </ul>
                <p className="fs-5 ">My role in team</p>
                <ul>
                  <li>Team lead</li>
                  <li>
                    <li>System analysis design and database design</li>
                  </li>
                  <li>Works on Front-End and Database</li>
                </ul>
              </div>
            </div>
            {/* ---------------------------------------------------------------------------- */}
            <div className="col-4 text-start" style={{ height: "100%" }}>
              <div className="sticky-container">
                <p className="fs-4 fw-bold d-flex align-items-center">
                  <FaGear className="me-2" />
                  TECH STACK
                </p>
                <ul className="mb-4">
                  <li>Java Spring Boot</li>
                  <li>Java Servlet</li>
                  <li>JSP</li>
                  <li>Reactjs</li>
                  <li>MySQL</li>
                  <li>Unity</li>
                </ul>
                <hr />
                <p className="fs-4 fw-bold d-flex align-items-center">
                  <GiSkills className="me-2" />
                  SOFT SKILL
                </p>
                <ul className="mb-4">
                  <li>
                    Basic knowledge of system design and software architecture
                  </li>
                  <li>
                    Basic understanding of object-oriented programming, data
                    structures and algorithms, and databases
                  </li>
                  <li>Know how to build APIs and test using Postman</li>
                  <li>Understand Git's workflow</li>
                </ul>
                <hr></hr>
                <p className="fs-4 fw-bold d-flex align-items-center">
                  <FaUniversity className="me-2" />
                  EDUCATION
                </p>
                <ul>
                  <li>GPA: 3.44</li>
                  <li>Received academic scholarships from school (5 times)</li>
                  <li>Language: Vietnamese and English</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Profile;
