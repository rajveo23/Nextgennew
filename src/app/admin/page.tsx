'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { AdminDataManager, BlogPost, FAQ, ImageFile, ContactSubmission, Client } from '../../lib/adminData'
import {
  DocumentTextIcon,
  PhotoIcon,
  QuestionMarkCircleIcon,
  UserGroupIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  ChartBarIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline'

export default function AdminDashboard() {
  const [stats, setStats] = useState([
    { name: 'Total Blogs', value: '0', icon: DocumentTextIcon, change: '+0', changeType: 'increase' },
    { name: 'Clients', value: '0', icon: BuildingOfficeIcon, change: '+0', changeType: 'increase' },
    { name: 'FAQ Items', value: '0', icon: QuestionMarkCircleIcon, change: '+0', changeType: 'increase' },
    { name: 'User Requests', value: '0', icon: UserGroupIcon, change: '+0', changeType: 'increase' },
  ])
  const [recentActivity, setRecentActivity] = useState<any[]>([])

  useEffect(() => {
    // Load dynamic data
    const loadData = async () => {
      await AdminDataManager.initializeData()
      
      const blogs: BlogPost[] = await AdminDataManager.getBlogs()
      const faqs: FAQ[] = await AdminDataManager.getFAQs()
      const images: ImageFile[] = await AdminDataManager.getImages()
      const contacts: ContactSubmission[] = await AdminDataManager.getContactSubmissions()
      const clients: Client[] = await AdminDataManager.getClients()
    
    // Update stats with real data
    setStats([
      { 
        name: 'Total Blogs', 
        value: blogs.length.toString(), 
        icon: DocumentTextIcon, 
        change: `+${blogs.filter((b: BlogPost) => b.status === 'published').length}`, 
        changeType: 'increase' 
      },
      { 
        name: 'Clients', 
        value: clients.length.toString(), 
        icon: BuildingOfficeIcon, 
        change: `+${clients.filter((c: Client) => c.isActive).length}`, 
        changeType: 'increase' 
      },
      { 
        name: 'FAQ Items', 
        value: faqs.length.toString(), 
        icon: QuestionMarkCircleIcon, 
        change: `+${faqs.filter((f: FAQ) => f.isActive).length}`, 
        changeType: 'increase' 
      },
      { 
        name: 'User Requests', 
        value: contacts.length.toString(), 
        icon: UserGroupIcon, 
        change: `+${contacts.filter((c: ContactSubmission) => c.status === 'new').length}`, 
        changeType: 'increase' 
      },
    ])

    // Create recent activity from real data
    const activities = []
    
    // Add recent blogs
    const recentBlogs = blogs.slice(0, 2).map((blog: BlogPost) => ({
      id: `blog-${blog.id}`,
      type: 'blog',
      title: blog.status === 'published' ? 'New blog post published' : 'New blog post created',
      description: blog.title,
      time: new Date(blog.publishDate).toLocaleDateString(),
      icon: DocumentTextIcon,
      iconBackground: blog.status === 'published' ? 'bg-green-500' : 'bg-blue-500',
    }))
    activities.push(...recentBlogs)

    // Add recent contact submissions
    const recentContacts = contacts.slice(0, 2).map((contact: ContactSubmission) => ({
      id: `contact-${contact.id}`,
      type: 'contact',
      title: 'New contact submission',
      description: `${contact.name} - ${contact.service || 'General Inquiry'}`,
      time: new Date(contact.timestamp).toLocaleDateString(),
      icon: UserGroupIcon,
      iconBackground: contact.status === 'new' ? 'bg-red-500' : 'bg-yellow-500',
    }))
    activities.push(...recentContacts)

    // Add recent FAQs
    const recentFAQs = faqs.slice(0, 1).map((faq: FAQ) => ({
      id: `faq-${faq.id}`,
      type: 'faq',
      title: 'FAQ updated',
      description: faq.question,
      time: 'Recently',
      icon: QuestionMarkCircleIcon,
      iconBackground: 'bg-purple-500',
    }))
    activities.push(...recentFAQs)

    setRecentActivity(activities.slice(0, 4))
    }
    loadData()
  }, [])

  const quickActions = [
    { name: 'Create New Blog', href: '/admin/blogs', icon: DocumentTextIcon, color: 'bg-blue-500' },
    { name: 'Add Client', href: '/admin/clients', icon: BuildingOfficeIcon, color: 'bg-green-500' },
    { name: 'Add FAQ', href: '/admin/faq', icon: QuestionMarkCircleIcon, color: 'bg-purple-500' },
    { name: 'View Requests', href: '/admin/requests', icon: UserGroupIcon, color: 'bg-orange-500' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-3xl font-bold leading-6 text-gray-900">Dashboard</h1>
        <p className="mt-2 max-w-4xl text-sm text-gray-500">
          Welcome to the NextGen Registry admin panel. Manage your content, view analytics, and handle user requests.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6 sm:py-6"
          >
            <dt>
              <div className="absolute rounded-md bg-primary-500 p-3">
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">{item.name}</p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{item.value}</p>
              <p className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                {item.change}
              </p>
            </dd>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-lg bg-white shadow"
        >
          <div className="p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Quick Actions</h3>
            <p className="mt-1 text-sm text-gray-500">Frequently used admin functions</p>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {quickActions.map((action) => (
                <a
                  key={action.name}
                  href={action.href}
                  className="group relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-gray-400 focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2 hover:shadow-md transition-all duration-200"
                >
                  <div className={`flex-shrink-0 rounded-lg p-3 ${action.color}`}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-sm font-medium text-gray-900 group-hover:text-primary-600">
                      {action.name}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-lg bg-white shadow"
        >
          <div className="p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Activity</h3>
            <p className="mt-1 text-sm text-gray-500">Latest updates and changes</p>
            <div className="mt-6 flow-root">
              <ul role="list" className="-mb-8">
                {recentActivity.map((activity, activityIdx) => (
                  <li key={activity.id}>
                    <div className="relative pb-8">
                      {activityIdx !== recentActivity.length - 1 ? (
                        <span
                          className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                          aria-hidden="true"
                        />
                      ) : null}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                            activity.status === 'published' ? 'bg-green-500' :
                            activity.status === 'pending' ? 'bg-yellow-500' :
                            activity.status === 'updated' ? 'bg-blue-500' :
                            'bg-purple-500'
                          }`}>
                            {activity.type === 'blog' && <DocumentTextIcon className="h-4 w-4 text-white" />}
                            {activity.type === 'request' && <UserGroupIcon className="h-4 w-4 text-white" />}
                            {activity.type === 'faq' && <QuestionMarkCircleIcon className="h-4 w-4 text-white" />}
                            {activity.type === 'image' && <PhotoIcon className="h-4 w-4 text-white" />}
                          </span>
                        </div>
                        <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                          <div>
                            <p className="text-sm text-gray-900">{activity.title}</p>
                            <p className="text-sm text-gray-500">{activity.description}</p>
                          </div>
                          <div className="whitespace-nowrap text-right text-sm text-gray-500">
                            {activity.time}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Analytics Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="rounded-lg bg-white shadow"
      >
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">Content Overview</h3>
              <p className="mt-1 text-sm text-gray-500">Summary of your content management</p>
            </div>
            <ChartBarIcon className="h-8 w-8 text-gray-400" />
          </div>
          
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <DocumentTextIcon className="h-5 w-5 text-blue-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-blue-800">Blog Posts</p>
                  <p className="text-sm text-blue-600">12 published, 3 drafts</p>
                </div>
              </div>
            </div>
            
            <div className="border-l-4 border-green-500 bg-green-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <PhotoIcon className="h-5 w-5 text-green-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">Media Files</p>
                  <p className="text-sm text-green-600">48 images, 2.3GB used</p>
                </div>
              </div>
            </div>
            
            <div className="border-l-4 border-purple-500 bg-purple-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <QuestionMarkCircleIcon className="h-5 w-5 text-purple-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-purple-800">FAQ Items</p>
                  <p className="text-sm text-purple-600">24 active, 2 pending</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
