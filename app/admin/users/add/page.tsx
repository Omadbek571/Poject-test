"use client";

// Kerakli kutubxonalar va komponentlarni import qilish
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Mail, Phone, Save, User, Wallet } from "lucide-react";
import { AdminLayout } from "@/components/admin/admin-layout";
import { Label } from "@/components/ui/label";

// Statik foydalanuvchi ma'lumotlari
const staticUserData = {
  id: "123",
  full_name: "Ali Valiev",
  email: "ali.valiev@example.com",
  phone_number: "+998901234567",
  address: "Toshkent, Chilanzar",
  study_place: "15-maktab",
  grade: "11-sinf",
  target_university: "Toshkent Davlat Universiteti",
  target_faculty: "Axborot Texnologiyalari",
  about_me: "Matematika va fizikaga qiziqaman.",
  status: "Faol",
  role: "Abituriyent",
  balance: 500000,
};

// Komponent interfeysi
interface UserDetailPageProps {
  params: { id: string };
}

export default function UserDetailPage({ params }: UserDetailPageProps) {
  const router = useRouter();
  const userId = params.id;
  const [formData, setFormData] = useState({
    full_name: staticUserData.full_name,
    email: staticUserData.email,
    phone_number: staticUserData.phone_number,
    address: staticUserData.address,
    study_place: staticUserData.study_place,
    grade: staticUserData.grade,
    target_university: staticUserData.target_university,
    target_faculty: staticUserData.target_faculty,
    about_me: staticUserData.about_me,
    status: staticUserData.status,
  });

  // Input o'zgarishlarini boshqarish
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Statusni o'zgartirish
  const handleStatusChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      status: checked ? "Faol" : "Nofaol",
    }));
  };

  // Saqlash funksiyasi (API'siz, faqat konsolga chiqaradi)
  const handleSaveChanges = () => {
    console.log("Yangilangan ma'lumotlar:", formData);
    alert("Ma'lumotlar saqlandi! (Konsolda ko'rishingiz mumkin)");
  };

  // Foydalanuvchini o'chirish
  const handleDeleteUser = () => {
    if (confirm("Haqiqatan ham bu foydalanuvchini o'chirmoqchimisiz?")) {
      alert("Foydalanuvchi o'chirildi!");
      router.push("/admin/dashboard");
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Button variant="outline" className="mr-4" onClick={() => router.push("/admin/users")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Orqaga
            </Button>
            <div>
              <h2 className="text-2xl font-bold mb-1">Foydalanuvchi Qo‘shish</h2>
              <p className="text-gray-600">ID: Add</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="destructive" onClick={handleDeleteUser}>
              O'chirish
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5 text-blue-500" />
                  Shaxsiy ma'lumotlar
                </CardTitle>
                <CardDescription>Foydalanuvchining shaxsiy ma'lumotlari</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="full_name">To'liq ism</Label>
                      <Input
                        id="full_name"
                        value={formData.full_name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone_number">Telefon</Label>
                      <Input
                        id="phone_number"
                        value={formData.phone_number}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Manzil</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="study_place">Maktab</Label>
                      <Input
                        id="study_place"
                        value={formData.study_place}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="grade">Sinf</Label>
                      <Input
                        id="grade"
                        value={formData.grade}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="target_university">Maqsad universitet</Label>
                      <Input
                        id="target_university"
                        value={formData.target_university}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="target_faculty">Maqsad fakultet</Label>
                      <Input
                        id="target_faculty"
                        value={formData.target_faculty}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="about_me">Qo'shimcha ma'lumotlar</Label>
                    <Textarea
                      id="about_me"
                      value={formData.about_me}
                      onChange={handleInputChange}
                      rows={4}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="active-status">Faol holati</Label>
                    </div>
                    <Switch
                      id="active-status"
                      checked={formData.status === "Faol"}
                      onCheckedChange={handleStatusChange}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSaveChanges}>
                  <Save className="mr-2 h-4 w-4" />
                  Saqlash
                </Button>
              </CardFooter>
            </Card>
          </div>
          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5 text-blue-500" />
                  Foydalanuvchi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <User className="h-12 w-12 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-1">{staticUserData.full_name}</h3>
                  <Badge className="mb-4">{staticUserData.role}</Badge>
                  <div className="w-full space-y-2">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm">{staticUserData.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm">{staticUserData.phone_number}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Wallet className="mr-2 h-5 w-5 text-blue-500" />
                  Balans
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">{staticUserData.balance.toLocaleString()} so'm</div>
                  <Button className="w-full" onClick={() => router.push(`/admin/payments/add/${userId}`)}>
                    Balansni to'ldirish
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}