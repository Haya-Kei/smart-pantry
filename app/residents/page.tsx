// app/residents/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Resident = {
  first_name: string;
  last_name: string;
  email: string;
  floor_number: number;
  phone_number: string;
  date_of_birth: string;
  preferred_pronouns: string;
  job_role: string;
  company_or_project: string;
  work_schedule: string;
  hours_per_day: number;
  on_site_days: string[];
  dietary_restrictions: string;
  preferred_cuisine: string;
  snack_preferences: string;
  beverage_preferences: string[];
  mealtime_needs: string;
  cooking_interest: string;
  fitness_interest: boolean;
  event_participation: boolean;
  community_needs: string;
};

export default function ResidentsPage() {
  const [data, setData] = useState<Resident[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "residentApplications"));
        const residents: Resident[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          residents.push({
            first_name: data.first_name || "",
            last_name: data.last_name || "",
            email: data.email || "",
            floor_number: data.floor_number || 0,
            phone_number: data.phone_number || "",
            date_of_birth: data.date_of_birth || "",
            preferred_pronouns: data.preferred_pronouns || "",
            job_role: data.job_role || "",
            company_or_project: data.company_or_project || "",
            work_schedule: data.work_schedule || "",
            hours_per_day: data.hours_per_day || 0,
            on_site_days: data.on_site_days || [],
            dietary_restrictions: data.dietary_restrictions || "",
            preferred_cuisine: data.preferred_cuisine || "",
            snack_preferences: data.snack_preferences || "",
            beverage_preferences: data.beverage_preferences || [],
            mealtime_needs: data.mealtime_needs || "",
            cooking_interest: data.cooking_interest || "",
            fitness_interest: data.fitness_interest || false,
            event_participation: data.event_participation || false,
            community_needs: data.community_needs || "",
          });
        });
        setData(residents);
      } catch (err) {
        console.error("Error fetching residents:", err);
        setError("居住者データの取得に失敗しました。");
      } finally {
        setLoading(false);
      }
    };

    fetchResidents();
  }, []);

  if (loading) {
    return (
      <div className="container py-5">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <Card className="bg-destructive/10 border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">エラー</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const grouped = data.reduce<Record<number, Resident[]>>((acc, r) => {
    acc[r.floor_number] = acc[r.floor_number] || [];
    acc[r.floor_number].push(r);
    return acc;
  }, {});

  return (
    <div className="container py-5">
      <h2 className="text-3xl font-bold mb-8 text-center">All Residents by Floor</h2>
      {Object.entries(grouped).map(([floor, list]) => (
        <Card key={floor} className="mb-8">
          <CardHeader className="bg-primary/10">
            <CardTitle>Floor {floor}</CardTitle>
            <CardDescription>
              {list.length} {list.length === 1 ? 'resident' : 'residents'} on this floor
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Job Role</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Work Schedule</TableHead>
                  <TableHead>Dietary Restrictions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {list.map((r, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{`${r.first_name} ${r.last_name}`}</TableCell>
                    <TableCell>{r.email}</TableCell>
                    <TableCell>{r.phone_number}</TableCell>
                    <TableCell>{r.job_role}</TableCell>
                    <TableCell>{r.company_or_project}</TableCell>
                    <TableCell>{r.work_schedule}</TableCell>
                    <TableCell>{r.dietary_restrictions}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
