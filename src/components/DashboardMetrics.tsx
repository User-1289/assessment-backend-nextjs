"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, Typography, Button, Grid, Box, CircularProgress } from "@mui/material"
import { TrendingUp, ShoppingCart, People, AttachMoney, FileDownload } from "@mui/icons-material"

interface MetricsData {
  totalNewCustomers: number
  totalOrders: number
  totalSales: number
    uniqueProductCount: number
}

export default function DashboardMetrics() {
  const [data, setData] = useState<MetricsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        // Set default date range (last 7 days)
        const endDate = new Date()
        const startDate = new Date()
        startDate.setDate(startDate.getDate() - 7)

        const params = new URLSearchParams({
          date_start: startDate.toISOString().split("T")[0],
          date_end: endDate.toISOString().split("T")[0],
        })

        const response = await fetch(`http://localhost:3001/api/dashboard/metrics?${params}`)
        const result = await response.json()
        console.log("Fetched metrics:", result)
        setData(result)
      } catch (error) {
        console.error("Failed to fetch metrics:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMetrics()
  }, [])

  const handleExport = () => {
    // Export functionality
    console.log("Export clicked")
  }

  if (loading) {
    return (
      <Box className="flex justify-center items-center h-64">
        <CircularProgress />
      </Box>
    )
  }

  const metrics = [
    {
      title: "Total Sales",
      value: "$" + data?.totalSales,
      change: "+8% from yesterday",
      icon: <AttachMoney className="text-white" />,
      bgColor: "bg-pink-200",
      iconBg: "bg-pink-500",
    },
    {
      title: "Total Order",
      value: data?.totalOrders?.toString() || "0",
      change: "+5% from yesterday",
      icon: <ShoppingCart className="text-white" />,
      bgColor: "bg-orange-200",
      iconBg: "bg-orange-500",
    },
    {
      title: "Product Sold (Unique)",
      value: data?.uniqueProductCount, // This would need to be added to your API
      change: "+1.2% from yesterday",
      icon: <TrendingUp className="text-white" />,
      bgColor: "bg-green-200",
      iconBg: "bg-green-500",
    },
    {
      title: "New Customers",
      value: data?.totalNewCustomers?.toString() || "0",
      change: "0.5% from yesterday",
      icon: <People className="text-white" />,
      bgColor: "bg-purple-200",
      iconBg: "bg-purple-500",
    },
  ]

  return (
    <Box className="border rounded-lg bg-white shadow-sm w-fit ">
      {/* Header */}
      <Box className="flex justify-between items-start mb-6 p-6 pb-0 min-w-fit">
        <Box>
          <Typography variant="h4" className="font-bold text-gray-900 mb-1">
            Today's Sales
          </Typography>
          <Typography variant="body1" className="text-gray-600">
            Sales Summary
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<FileDownload />}
          onClick={handleExport}
          className="text-gray-700 border-gray-300 hover:bg-gray-50"
        >
          Export
        </Button>
      </Box>

      {/* Metrics Grid */}
      <Box className="p-6 pt-0">
        <Grid container spacing={2} className="w-fit">
          {metrics.map((metric, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card className={`${metric.bgColor} border-0 shadow-sm h-full`}>
                <CardContent className="p-3"> {/* reduced padding */}
                  <Box className="flex items-start justify-between mb-3">
                    <Box className={`${metric.iconBg} rounded-full p-1.5 w-10 h-10 flex items-center justify-center`}>
                      {metric.icon}
                    </Box>
                  </Box>
                  <Typography variant="h5" className="font-bold text-gray-900 mb-1"> {/* smaller text */}
                    {metric.value}
                  </Typography>
                  <Typography variant="body2" className="font-medium text-gray-700 mb-0.5">
                    {metric.title}
                  </Typography>
                  <Typography variant="body2" className="text-gray-600 text-sm">
                    {metric.change}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}
