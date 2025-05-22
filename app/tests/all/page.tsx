"use client"

import React, { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, AlertCircle, Search, ArrowLeft, Filter, BookOpen, ChevronRight } from "lucide-react"
import axios from "axios" // Agar API dan ma'lumot olmoqchi bo'lsangiz

interface TestSubject {
  id: number
  name: string
}

interface Test {
  id: number
  title: string
  subject: TestSubject // Yoki subject_name: string bo'lishi mumkin API ga qarab
  difficulty_display: string // Yoki difficulty: string
  question_count: number
  price_display?: string // Agar narxi bo'lsa
  status_display?: string // Agar statusi bo'lsa
  test_type?: string // 'free', 'premium'
}

// --- Mock Data (Haqiqiy API bilan almashtiriladi) ---
const MOCK_TESTS: Test[] = [
  {
    id: 1,
    title: "Matematika DTM Variant #1",
    subject: { id: 1, name: "Matematika" },
    difficulty_display: "O'rta",
    question_count: 30,
    price_display: "Bepul",
    test_type: "free",
    status_display: "Faol",
  },
  {
    id: 2,
    title: "Fizika Nazariy Savollar",
    subject: { id: 2, name: "Fizika" },
    difficulty_display: "Qiyin",
    question_count: 25,
    price_display: "10,000 so'm",
    test_type: "premium",
    status_display: "Faol",
  },
  {
    id: 3,
    title: "Ingliz tili Grammatika Asoslari",
    subject: { id: 5, name: "Ingliz tili" },
    difficulty_display: "Oson",
    question_count: 50,
    price_display: "Bepul",
    test_type: "free",
    status_display: "Faol",
  },
  {
    id: 4,
    title: "Tarix: O'rta Osiyo Xonliklari",
    subject: { id: 7, name: "Tarix" },
    difficulty_display: "O'rta",
    question_count: 20,
    price_display: "Bepul",
    test_type: "free",
    status_display: "Faol",
  },
  {
    id: 5,
    title: "Matematika Murakkab Masalalar",
    subject: { id: 1, name: "Matematika" },
    difficulty_display: "Murakkab",
    question_count: 15,
    price_display: "15,000 so'm",
    test_type: "premium",
    status_display: "Faol",
  },
]

const MOCK_SUBJECTS: TestSubject[] = [
  { id: 1, name: "Matematika" },
  { id: 2, name: "Fizika" },
  { id: 3, name: "Kimyo" },
  { id: 4, name: "Biologiya" },
  { id: 5, name: "Ingliz tili" },
  { id: 6, name: "Ona tili" },
  { id: 7, name: "Tarix" },
]
// --- Mock Data Tugadi ---

export default function AllTestsPage() {
  const router = useRouter()
  const [tests, setTests] = useState<Test[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [searchTerm, setSearchTerm] = useState("")
  const [subjectFilter, setSubjectFilter] = useState("all") // Fan IDsi yoki nomi
  const [difficultyFilter, setDifficultyFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all") // 'all', 'free', 'premium'

  const [subjects, setSubjects] = useState<TestSubject[]>(MOCK_SUBJECTS) // API dan olinishi kerak
  const difficulties = [
    { value: "all", label: "Barcha qiyinliklar" },
    { value: "Oson", label: "Oson" },
    { value: "O'rta", label: "O'rta" },
    { value: "Qiyin", label: "Qiyin" },
    { value: "Murakkab", label: "Murakkab" },
  ]

  useEffect(() => {
    const fetchTests = async () => {
      setIsLoading(true)
      setError(null)
      try {
        // ------------ HAQIQIY API SO'ROVI (KEYINROQ ALMASHTIRASIZ) -------------
        // const token = localStorage.getItem("token");
        // if (!token) {
        //   router.push("/login"); // Yoki boshqa xatolik xabari
        //   return;
        // }
        // const response = await axios.get("https://testonline.pythonanywhere.com/api/tests/public/", { // Yoki /api/tests/
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // });
        // setTests(response.data.results || response.data);

        // Hozircha mock data
        await new Promise(resolve => setTimeout(resolve, 500)); // Kechikishni simulyatsiya qilish
        setTests(MOCK_TESTS)

      } catch (err: any) {
        console.error("Testlarni yuklashda xatolik:", err)
        setError("Testlarni yuklashda xatolik yuz berdi. Iltimos, keyinroq qayta urinib ko'ring.")
        // if (err.response?.status === 401) {
        //   router.push("/login");
        // }
      } finally {
        setIsLoading(false)
      }
    }

    fetchTests()
    // Haqiqiy API uchun fanlarni ham yuklashingiz kerak bo'ladi
    // fetchSubjects();
  }, [router])

  const filteredTests = useMemo(() => {
    return tests.filter((test) => {
      const matchesSearch = test.title.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesSubject = subjectFilter === "all" || test.subject.name === subjectFilter // Yoki test.subject.id == subjectFilter
      const matchesDifficulty = difficultyFilter === "all" || test.difficulty_display === difficultyFilter
      const matchesType = typeFilter === "all" || test.test_type === typeFilter
      return matchesSearch && matchesSubject && matchesDifficulty && matchesType
    })
  }, [tests, searchTerm, subjectFilter, difficultyFilter, typeFilter])

  const handleStartTest = (testId: number, testType?: string) => {
    // Bu yerda testni boshlash logikasi bo'ladi
    // Masalan, agar pullik test bo'lsa, to'lovni tekshirish
    if (testType === "premium") {
      alert(`Pullik test (ID: ${testId}). To'lov sahifasiga o'tiladi (hozircha yo'q).`)
      // router.push(`/payments/test/${testId}`); // Misol uchun
    } else {
      router.push(`/tests/take/${testId}`) // Testni boshlash sahifasiga
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto" />
          <p className="mt-4 text-lg text-gray-700">Testlar yuklanmoqda...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-2" />
            <CardTitle className="text-red-600">Xatolik!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">{error}</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => router.push("/profile")} className="w-full">
              Profilga qaytish
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto">
        <div className="flex items-center mb-6">
          <Button variant="outline" className="mr-4" onClick={() => router.push("/profile")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Orqaga
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold">Mavjud Testlar</h1>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-4 md:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Test nomi bo'yicha qidirish..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Fan bo'yicha" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Barcha fanlar</SelectItem>
                  {subjects.map((subject) => (
                    <SelectItem key={subject.id} value={subject.name}> {/* Yoki subject.id */}
                      {subject.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Qiyinlik darajasi" />
                </SelectTrigger>
                <SelectContent>
                  {difficulties.map((diff) => (
                    <SelectItem key={diff.value} value={diff.value}>
                      {diff.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Test turi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Barcha turlar</SelectItem>
                  <SelectItem value="free">Bepul</SelectItem>
                  <SelectItem value="premium">Pullik</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Test List */}
        {filteredTests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTests.map((test) => (
              <Card key={test.id} className="flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg line-clamp-2">{test.title}</CardTitle>
                    {test.test_type === "premium" && (
                        <Badge variant="destructive">Pullik</Badge>
                    )}
                     {test.test_type === "free" && (
                        <Badge variant="secondary">Bepul</Badge>
                    )}
                  </div>
                  <CardDescription className="text-sm text-muted-foreground">
                    {test.subject.name}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex justify-between text-sm text-muted-foreground mb-1">
                    <span>Qiyinlik:</span>
                    <span className="font-medium">{test.difficulty_display}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground mb-1">
                    <span>Savollar soni:</span>
                    <span className="font-medium">{test.question_count}</span>
                  </div>
                  {test.price_display && test.test_type === "premium" && (
                     <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Narxi:</span>
                        <span className="font-medium text-green-600">{test.price_display}</span>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => handleStartTest(test.id, test.test_type)}>
                    <BookOpen className="mr-2 h-4 w-4" />
                    Testni Boshlash
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-muted-foreground">Testlar topilmadi</h2>
            <p className="text-muted-foreground">Tanlangan filtrlar bo'yicha testlar mavjud emas.</p>
          </div>
        )}

        {/* TODO: Pagination (agar kerak bo'lsa) */}
      </div>
    </div>
  )
}