
import { useState } from 'react';
import { Card } from './components/ui/card';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';

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
    tags: ["Blockchain", "Civic Tech", "Engineering"]
  },
];

const initialStudents = [
  { name: "Ava Johnson", major: "Computer Science", skills: ["AI", "Python", "Data Science"], bio: "Passionate about building sustainable tech solutions." },
  { name: "Liam Patel", major: "Information Systems", skills: ["Blockchain", "Smart Contracts"], bio: "Focused on decentralized applications for civic engagement." },
];

const initialRecruiters = [
  { name: "RecruiterX", company: "TechNova", interestAreas: ["AI", "Sustainability"] },
];

export default function InternConnectApp() {
  const [projects] = useState(initialProjects);
  const [students] = useState(initialStudents);
  const [recruiters] = useState(initialRecruiters);
  const [filter, setFilter] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [tab, setTab] = useState("login");

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
            <TabsTrigger value="recruiter">Recruiter View</TabsTrigger>
            <TabsTrigger value="projects">Project Feed</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <h2 className="text-2xl font-semibold mb-4">Student Overview</h2>
            <ul className="space-y-4">
              {students.map((s, idx) => (
                <li key={idx} className="p-4 border rounded-xl shadow-sm">
                  <h3 className="text-lg font-medium">{s.name} — {s.major}</h3>
                  <p className="text-sm text-gray-500">Skills: {s.skills.join(", ")}</p>
                </li>
              ))}
            </ul>
          </TabsContent>

          <TabsContent value="profile">
            <h2 className="text-2xl font-semibold mb-4">My Profile</h2>
            {students[0] && (
              <Card className="max-w-xl">
                <CardContent className="p-4">
                  <h3 className="text-xl font-bold mb-2">{students[0].name}</h3>
                  <p className="text-gray-600 mb-1">{students[0].major}</p>
                  <p className="text-sm mb-2">{students[0].bio}</p>
                  <div className="flex flex-wrap gap-2">
                    {students[0].skills.map(skill => (
                      <span key={skill} className="px-2 py-1 text-sm bg-green-100 text-green-800 rounded-full">{skill}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="recruiter">
            <h2 className="text-2xl font-semibold mb-4">Recruiter Dashboard</h2>
            <ul className="space-y-4">
              {recruiters.map((r, idx) => (
                <li key={idx} className="p-4 border rounded-xl shadow-sm">
                  <h3 className="text-lg font-medium">{r.name} @ {r.company}</h3>
                  <p className="text-sm text-gray-500">Interest Areas: {r.interestAreas.join(", ")}</p>
                </li>
              ))}
            </ul>
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
        </Tabs>
      )}
    </div>
  );
}
