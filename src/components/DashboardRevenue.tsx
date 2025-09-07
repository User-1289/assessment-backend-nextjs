"use client"
import type React from "react"
import { useEffect, useState } from "react"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import { Bar } from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface BreakdownItem {
  orderType: "online" | "offline"
  totalOrders: string
  totalSales: string
}

interface RevenueData {
  date: string
  totalOrders: number
  totalSales: number
  dayName: string
  breakdown: BreakdownItem[]
}

const DashboardRevenue: React.FC = () => {
  const [revenueData, setRevenueData] = useState<RevenueData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/dashboard/revenue")
        if (!response.ok) {
          throw new Error("Failed to fetch revenue data")
        }
        const data: RevenueData[] = await response.json()
        setRevenueData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchRevenueData()
  }, [])

 const processChartData = () => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    const onlineSales: number[] = []
    const offlineSales: number[] = []

    days.forEach((day) => {
      const dayData = revenueData.find((item) => item.dayName === day)

      let onlineAmount = 0
      let offlineAmount = 0

      if (dayData) {
        dayData.breakdown.forEach((item) => {
          const sales = Number.parseInt(item.totalSales)
          if (item.orderType === "online") {
            onlineAmount += sales
          } else if (item.orderType === "offline") {
            offlineAmount += sales
          }
        })
      }

      onlineSales.push(onlineAmount)
      offlineSales.push(offlineAmount)
    })

    return { onlineSales, offlineSales }
  }

  const { onlineSales, offlineSales } = processChartData()

  const chartData = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    datasets: [
      {
        label: "Online Sales",
        data: onlineSales,
        backgroundColor: "#3B82F6",
        borderColor: "#3B82F6",
        borderWidth: 0,
        borderRadius: 6,
        borderSkipped: false,
        barThickness: 32,
      },
      {
        label: "Offline Sales",
        data: offlineSales,
        backgroundColor: "#22C55E",
        borderColor: "#22C55E",
        borderWidth: 0,
        borderRadius: 6,
        borderSkipped: false,
        barThickness: 32,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
          font: {
            size: 14,
            family: "Inter, sans-serif",
          },
          color: "#6B7280",
        },
      },
      title: {
        display: true,
        text: "Total Revenue",
        font: {
          size: 20,
          weight: "600" as const,
          family: "Inter, sans-serif",
        },
        color: "#1F2937",
        padding: {
          bottom: 24,
        },
        align: "start" as const,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
            family: "Inter, sans-serif",
          },
          color: "#9CA3AF",
        },
      },
      y: {
        beginAtZero: true,
        max: 25000,
        grid: {
          color: "#F3F4F6",
          drawBorder: false,
        },
        border: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
            family: "Inter, sans-serif",
          },
          color: "#9CA3AF",
          stepSize: 5000,
          callback: (value: any) => {
            return value / 1000 + "k"
          },
        },
      },
    },
    elements: {
      bar: {
        borderRadius: 6,
      },
    },
    layout: {
      padding: {
        top: 16,
        right: 16,
        bottom: 16,
        left: 16,
      },
    },
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Loading revenue data...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-red-600">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg p-6 w-full max-w-4xl">
      <div style={{ height: "400px" }}>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  )
}

export default DashboardRevenue
