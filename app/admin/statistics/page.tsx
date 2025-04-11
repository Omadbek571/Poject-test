"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AdminLayout } from "@/components/admin/admin-layout"
import { BarChart, LineChart, PieChart } from "lucide-react"

export default function StatisticsPage() {
  const [period, setPeriod] = useState("month")

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Statistika</h2>
            <p className="text-gray-600">Platforma statistikasi va analitikasi</p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Davr" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Hafta</SelectItem>
                <SelectItem value="month">Oy</SelectItem>
                <SelectItem value="quarter">Chorak</SelectItem>
                <SelectItem value="year">Yil</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">Hisobotni yuklab olish</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Jami foydalanuvchilar</p>
                  <h3 className="text-3xl font-bold">5,842</h3>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <LineChart className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4">
                <div className="h-2 bg-gray-100 rounded-full">
                  <div className="h-2 bg-blue-500 rounded-full w-3/4"></div>
                </div>
                <div className="flex justify-between mt-2 text-sm">
                  <span className="text-green-600">+12% o'sish</span>
                  <span className="text-gray-500">Maqsad: 8,000</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Faol abituriyentlar</p>
                  <h3 className="text-3xl font-bold">3,105</h3>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <BarChart className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4">
                <div className="h-2 bg-gray-100 rounded-full">
                  <div className="h-2 bg-green-500 rounded-full w-1/2"></div>
                </div>
                <div className="flex justify-between mt-2 text-sm">
                  <span className="text-green-600">+8% o'sish</span>
                  <span className="text-gray-500">Maqsad: 6,000</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Jami daromad</p>
                  <h3 className="text-3xl font-bold">24.5M</h3>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <PieChart className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-4">
                <div className="h-2 bg-gray-100 rounded-full">
                  <div className="h-2 bg-purple-500 rounded-full w-2/3"></div>
                </div>
                <div className="flex justify-between mt-2 text-sm">
                  <span className="text-green-600">+18% o'sish</span>
                  <span className="text-gray-500">Maqsad: 35M</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="mb-6">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="users">Foydalanuvchilar</TabsTrigger>
            <TabsTrigger value="tests">Testlar</TabsTrigger>
            <TabsTrigger value="payments">To'lovlar</TabsTrigger>
            <TabsTrigger value="courses">Kurslar</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Foydalanuvchilar statistikasi</CardTitle>
                <CardDescription>Platformadagi foydalanuvchilar soni va o'sish dinamikasi</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 bg-muted/20 rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Foydalanuvchilar grafigi</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm text-gray-500">Yangi foydalanuvchilar</div>
                      <div className="text-2xl font-bold">+842</div>
                      <div className="text-xs text-green-600">+12% o'tgan davrga nisbatan</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm text-gray-500">Faol foydalanuvchilar</div>
                      <div className="text-2xl font-bold">3,105</div>
                      <div className="text-xs text-green-600">+8% o'tgan davrga nisbatan</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm text-gray-500">O'rtacha faollik</div>
                      <div className="text-2xl font-bold">24 min</div>
                      <div className="text-xs text-green-600">+5% o'tgan davrga nisbatan</div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tests">
            <Card>
              <CardHeader>
                <CardTitle>Testlar statistikasi</CardTitle>
                <CardDescription>Platformadagi testlar soni va o'sish dinamikasi</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 bg-muted/20 rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Testlar grafigi</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm text-gray-500">Jami testlar</div>
                      <div className="text-2xl font-bold">1,284</div>
                      <div className="text-xs text-green-600">+15% o'tgan davrga nisbatan</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm text-gray-500">Yechilgan testlar</div>
                      <div className="text-2xl font-bold">45,621</div>
                      <div className="text-xs text-green-600">+22% o'tgan davrga nisbatan</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm text-gray-500">O'rtacha ball</div>
                      <div className="text-2xl font-bold">68%</div>
                      <div className="text-xs text-green-600">+3% o'tgan davrga nisbatan</div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>To'lovlar statistikasi</CardTitle>
                <CardDescription>Platformadagi to'lovlar soni va o'sish dinamikasi</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 bg-muted/20 rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">To'lovlar grafigi</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm text-gray-500">Jami to'lovlar</div>
                      <div className="text-2xl font-bold">24.5M</div>
                      <div className="text-xs text-green-600">+18% o'tgan davrga nisbatan</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm text-gray-500">To'lovlar soni</div>
                      <div className="text-2xl font-bold">1,842</div>
                      <div className="text-xs text-green-600">+14% o'tgan davrga nisbatan</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm text-gray-500">O'rtacha to'lov</div>
                      <div className="text-2xl font-bold">13,300</div>
                      <div className="text-xs text-green-600">+5% o'tgan davrga nisbatan</div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="courses">
            <Card>
              <CardHeader>
                <CardTitle>Kurslar statistikasi</CardTitle>
                <CardDescription>Platformadagi kurslar soni va o'sish dinamikasi</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 bg-muted/20 rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Kurslar grafigi</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm text-gray-500">Jami kurslar</div>
                      <div className="text-2xl font-bold">48</div>
                      <div className="text-xs text-green-600">+6 o'tgan davrga nisbatan</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm text-gray-500">Ro'yxatdan o'tganlar</div>
                      <div className="text-2xl font-bold">2,845</div>
                      <div className="text-xs text-green-600">+20% o'tgan davrga nisbatan</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm text-gray-500">Tugatganlar</div>
                      <div className="text-2xl font-bold">1,254</div>
                      <div className="text-xs text-green-600">+15% o'tgan davrga nisbatan</div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}

