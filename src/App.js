import { useState, useEffect } from 'react';
import { Card, CardContent } from './components/ui/card';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './components/ui/tabs';

// Sample data
const initialProjects = [
  {
    id: 1,
    title: "AI-Powered Sustainability Tracker",
    student: "Ava Johnson",
    description: "A research project using AI to monitor carbon emissions from campus buildings.",
    tags: ["AI", "Sustainability", "Research"],
  },
  {
    id: 2,
    title: "Blockchain Voting System",
    student: "Liam Patel",
    description: "Built a secure digital voting app using Ethereum smart contracts.",
    tags: ["Blockchain", "Civic Tech", "Engineering"],
  },
];

const initialStudents = [
  {
    name: "Ava Johnson",
    major: "Computer Science",
    skills: ["AI", "Python", "Data Science"],
    bio: "Passionate about building sustainable tech solutions.",
    projects: [initialProjects[0]],
  },
  {
    name: "Liam Patel",
    major: "Information Systems",
    skills: ["Blockchain", "Smart Contracts"],
    bio: "Focused on decentralized applications for civic engagement.",
    projects: [initialProjects[1]],
  },
];

const initialRecruiters = [
  { name: "RecruiterX", company: "TechNova", interestAreas: ["AI", "Sustainability"] },
];

const initialOpportunities = [
  {
    id: 1,
    title: "Summer AI Internship",
    company: "GreenTech",
    description: "Work on AI-driven sustainability projects.",
    requiredSkills: ["AI", "Python"],
    type: "internship",
  },
  {
    id: 2,
    title: "Blockchain Hackathon",
    company: "CryptoUni",
    description: "Build decentralized apps in a 48-hour competition.",
    requiredSkills: ["Blockchain", "Smart Contracts"],
    type: "competition",
  },
];

// Helper function to simulate AI-powered matching
function matchOpportunities(student, opportunities) {
  return opportunities.filter(opp =>
    opp.requiredSkills.some(skill => student.skills.includes(skill))
  );
}

Navbar Component
function Navbar({ setTab }) {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">InternConnect</h1>
        <div>
          <button onClick={() => setTab("dashboard")} className="mr-4 hover:underline">Dashboard</button>
          <button onClick={() => setTab("profile")} className="mr-4 hover:underline">Profile</button>
          <button onClick={() => setTab("projects")} className="mr-4 hover:underline">Projects</button>
          <button onClick={() => setTab("opportunities")} className="mr-4 hover:underline">Opportunities</button>
          <button onClick={() => setTab("recruiter")} className="mr-4 hover:underline">Recruiter</button>
          <button onClick={() => setTab("login")} className="hover:underline">Logout</button>
        </div>
      </div>
    </nav>
  );
}

// Portfolio Card Component
function PortfolioCard({ student }) {
  return (
    <Card className="max-w-xl mb-4">
      <CardContent className="p-4">
        <h3 className="text-xl font-bold mb-2">{student.name}</h3>
        <p className="text-gray-600 mb-1">{student.major}</p>
        <p className="text-sm mb-2">{student.bio}</p>
        <h4 className="text-lg font-medium mt-4">Projects</h4>
        {student.projects.map((project, index) => (
          <div key={index} className="mt-2">
            <p className="font-medium">{project.title}</p>
            <p className="text-gray-600">{project.description}</p>
            <p className="text-gray-500">Tags: {project.tags.join(", ")}</p>
          </div>
        ))}
        <p className="mt-4">Skills: {student.skills.join(", ")}</p>
      </CardContent>
    </Card>
  );
}

// Opportunity Card Component
function OpportunityCard({ opportunity }) {
  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <h2 className="text-xl font-semibold mb-1">{opportunity.title}</h2>
        <p className="text-gray-600 mb-1">{opportunity.company}</p>
        <p className="text-gray-600 mb-2">{opportunity.description}</p>
        <p className="text-gray-500 mb-2">Required Skills: {opportunity.requiredSkills.join(", ")}</p>
        <Button>Apply Now</Button>
      </CardContent>
    </Card>
  );
}

// Main App Component
export default function App() {
  const [projects] = useState(initialProjects);
  const [students] = useState(initialStudents);
  const [recruiters] = useState(initialRecruiters);
  const [opportunities] = useState(initialOpportunities);
  const [filter, setFilter] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [tab, setTab] = useState("login");
  const [matchedOpportunities, setMatchedOpportunities] = useState([]);

  // Simulate AI matching on load for the first student
  useEffect(() => {
    if (currentUser === "student" && students.length > 0) {
      const matches = matchOpportunities(students[0], opportunities);
      setMatchedOpportunities(matches);
    }
  }, [currentUser, students, opportunities]);

  const handleLogin = (role) => {
    setCurrentUser(role);
    if (role === "student") setTab("dashboard");
    if (role === "recruiter") setTab("recruiter");
  };

  const filteredProjects = projects.filter(p =>
    p.title.toLowerCase().includes(filter.toLowerCase()) ||
    p.description.toLowerCase().includes(filter.toLowerCase()) ||
    p.tags.some(tag => tag.toLowerCase().includes(filter.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {tab !== "login" && <Navbar setTab={setTab} />}
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">InternConnect Prototype</h1>

        {tab === "login" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-2">Login</h2>
            <p className="text-gray-600">Select your role to get started:</p>
            <Button onClick={() => handleLogin("student")}>Login as Student</Button>
            <Button onClick={() => handleLogin("recruiter")} variant="outline">Login as Recruiter</Button>
          </div>
        )}

        {tab !== "login" && (
          <Tabs value={tab} onValueChange={setTab} className="w-full mt-4">
            <TabsList className="mb-4">
              <TabsTrigger value="dashboard">Student Dashboard</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="projects">Project Feed</TabsTrigger>
              <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
              <TabsTrigger value="recruiter">Recruiter View</TabsTrigger>
              <TabsTrigger value="login">Logout</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              <h2 className="text-2xl font-semibold mb-4">Student Overview</h2>
              <div className="space-y-4">
                {students.map((s, idx) => (
                  <Card key={idx} className="p-4">
                    <CardContent>
                      <h3 className="text-lg font-medium">{s.name} — {s.major}</h3>
                      <p className="text-sm text-gray-500">Skills: {s.skills.join(", ")}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="profile">
              <h2 className="text-2xl font-semibold mb-4">My Profile</h2>
              {students[0] && <PortfolioCard student={students[0]} />}
            </TabsContent>

            <TabsContent value="projects">
              <h2 className="text-2xl font-semibold mb-2">Student Project Feed</h2>
              <p className="mb-4 text-gray-600">Explore student-led research, career, and academic initiatives.</p>
              <Input
                placeholder="Search by keyword or tag..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="mb-6"
              />
              <div className="grid md:grid-cols-2 gap-4">
                {filteredProjects.map((project) => (
                  <Card key={project.id} className="rounded-2xl shadow-md">
                    <CardContent className="p-4">
                      <h2 className="text-xl font-semibold mb-1">{project.title}</h2>
                      <p className="text-gray-500 mb-2">By {project.student}</p>
                      <p className="mb-2">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">{tag}</span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="opportunities">
              <h2 className="text-2xl font-semibold mb-4">Campus Opportunities</h2>
              {matchedOpportunities.length > 0 ? (
                matchedOpportunities.map(opp => (
                  <OpportunityCard key={opp.id} opportunity={opp} />
                ))
              ) : (
                <p className="text-gray-600">No opportunities match your skills yet.</p>
              )}
            </TabsContent>

            <TabsContent value="recruiter">
              <h2 className="text-2xl font-semibold mb-4">Recruiter Dashboard</h2>
              <div className="space-y-4">
                {recruiters.map((r, idx) => (
                  <Card key={idx} className="p-4">
                    <CardContent>
                      <h3 className="text-lg font-medium">{r.name} @ {r.company}</h3>
                      <p className="text-sm text-gray-500">Interest Areas: {r.interestAreas.join(", ")}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}
