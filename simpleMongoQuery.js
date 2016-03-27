/*Report the number of resumes from New York (page 3, center)*/
/*db.resumes.find({location: "New York, NY"}).count()*/
6139

/*Write one query to MongoDB to retrieve some data (page 3, bottom)*/
/*The query gets all resumes of alumni of UIUC and pretty-prints the output*/

db.resumes.find({"education.university" : "University of Illinois at Urbana-Champaign"}).pretty()

/*
{
	"_id" : ObjectId("56b676795d134274640be84a"),
	"additionalInfo" : "TECHNICAL SKILLS ●   Computer­Aided Design (SolidWorks, ProEngineer Wildfire, AutoCAD) ●   Extensive CAD experience designing sheet metal and rotationally­molded plastic parts/assemblies ●   Testing and experimentation of prototypes including cleaning efficiency and other performance tests ●   Material/Fabrication Cost Analysis ●   Rapid prototyping (Objet, SLS, FDM) ●   ANSYS, MATLAB, Microsoft Office (Excel, Outlook, Word, PowerPoint) ●   Customer Service EXTRACURRICULARS ●   Member of the Potbelly Sandwich Advisory Board ●   Volunteered at Lollapalooza on the Rock 'N Recycle Team and the CamelBak Filling Station Team",
	"additionalInfo_html" : "<p>TECHNICAL SKILLS <br/>●   Computer­Aided Design (SolidWorks, ProEngineer Wildfire, AutoCAD) <br/>●   Extensive CAD experience designing sheet metal and rotationally­molded plastic parts/assemblies <br/>●   Testing and experimentation of prototypes including cleaning efficiency and other performance tests <br/>●   Material/Fabrication Cost Analysis <br/>●   Rapid prototyping (Objet, SLS, FDM) <br/>●   ANSYS, MATLAB, Microsoft Office (Excel, Outlook, Word, PowerPoint) <br/>●   Customer Service <br/>EXTRACURRICULARS <br/>●   Member of the Potbelly Sandwich Advisory Board <br/>●   Volunteered at Lollapalooza on the Rock 'N Recycle Team and the CamelBak Filling Station Team</p>",
	"awards" : [ ],
	"certifications" : [ ],
	"education" : [
		{
			"degree" : "Bachelor of Science in Mechanical Engineering",
			"start_finish_dates" : "2006 to 2010",
			"university" : "University of Illinois at Urbana-Champaign",
			"university_location" : "Urbana, IL"
		}
	],
	"groups" : [ ],
	"location" : "Chicago, IL",
	"name" : "Joshua Fisher",
	"skills" : [ ],
	"work_experience" : [
		{
			"company" : "Graymills Corporation",
			"company_location" : "Chicago, IL",
			"job_title" : "Mechanical Design Engineer",
			"responsibilities" : "●   Implemented a redesign of rotationallymolded plastic parts washers, acting as the sole engineer on the project, which reduced the product's manufacturing costs 40% compared to the old product ",
			"start_finish_dates" : "2012 to 2015"
		},
		{
			"company" : "New York Blower Company",
			"company_location" : "Willowbrook, IL",
			"job_title" : "Inside Sales Engineer",
			"responsibilities" : "●   Assisted sales representatives in the field with determining pricing for any modifications to standard ",
			"start_finish_dates" : "2011 to 2012"
		},
		{
			"company" : "Beverly Country Club",
			"company_location" : "Chicago, IL",
			"job_title" : "Caddie",
			"responsibilities" : "Caddied for six summers, earned rank \"Honor Caddie\", and awarded the Chick Evans Caddie ",
			"start_finish_dates" : "2002 to 2008"
		}
	]
}
{
	"_id" : ObjectId("56b6767a5d134274640bfac7"),
	"additionalInfo" : "",
	"additionalInfo_html" : null,
	"awards" : [ ],
	"certifications" : [ ],
	"education" : [
		{
			"degree" : "Bachelor of Arts in Global Studies",
			"start_finish_dates" : "2009 to 2013",
			"university" : "University of Illinois at Urbana-Champaign",
			"university_location" : "Urbana-Champaign, IL"
		}
	],
	"groups" : [ ],
	"location" : "Oak Park, IL",
	"name" : "Ashley Moy",
	"skills" : [ ],
	"work_experience" : [
		{
			"company" : "Aon",
			"company_location" : "Lincolnshire, IL",
			"job_title" : "Delivery Specialist",
			"responsibilities" : "Support end to end client service delivery for aligned domain(s) ",
			"start_finish_dates" : "January 2015 to Present"
		},
		{
			"company" : "MIQ Logistics",
			"company_location" : "Chicago, IL",
			"job_title" : "International Supply Chain Analyst",
			"responsibilities" : "Enter transportation data into PVPO and DCS from a regulatory and tracking perspective ",
			"start_finish_dates" : "December 2013 to January 2015"
		}
	]
}
{
	"_id" : ObjectId("56b6767a5d134274640bfc10"),
	"additionalInfo" : "",
	"additionalInfo_html" : null,
	"awards" : [ ],
	"certifications" : [ ],
	"education" : [
		{
			"degree" : "BS in Educational Leadership",
			"start_finish_dates" : "2010 to 2012",
			"university" : "Lewis University",
			"university_location" : "Romeoville, IL"
		},
		{
			"degree" : "MA in Counseling",
			"start_finish_dates" : "2006 to 2009",
			"university" : "Northeastern Illinois University",
			"university_location" : "Chicago, IL"
		},
		{
			"degree" : "BS in Leisure Studies",
			"start_finish_dates" : "2001 to 2005",
			"university" : "University of Illinois at Urbana-Champaign",
			"university_location" : "Champaign, IL"
		}
	],
	"groups" : [ ],
	"location" : "San Diego, CA",
	"name" : "Natalie Rubino",
	"skills" : [ ],
	"work_experience" : [
		{
			"company" : "Glenbard West High School",
			"company_location" : "Glen Ellyn, IL",
			"job_title" : "School Counselor",
			"responsibilities" : "Responsibilities ",
			"start_finish_dates" : "August 2009 to Present"
		}
	]
}

*/