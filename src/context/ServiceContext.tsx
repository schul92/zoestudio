'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface Service {
  id: string
  title: string
  description: string
  price?: string
}

interface ServiceContextType {
  selectedServices: Service[]
  addService: (service: Service) => void
  removeService: (id: string) => void
  clearServices: () => void
  isServiceSelected: (id: string) => boolean
}

const ServiceContext = createContext<ServiceContextType | undefined>(undefined)

export function ServiceProvider({ children }: { children: ReactNode }) {
  const [selectedServices, setSelectedServices] = useState<Service[]>([])

  const addService = (service: Service) => {
    setSelectedServices(prev => {
      if (prev.find(s => s.id === service.id)) {
        return prev
      }
      return [...prev, service]
    })
  }

  const removeService = (id: string) => {
    setSelectedServices(prev => prev.filter(s => s.id !== id))
  }

  const clearServices = () => {
    setSelectedServices([])
  }

  const isServiceSelected = (id: string) => {
    return selectedServices.some(s => s.id === id)
  }

  return (
    <ServiceContext.Provider value={{
      selectedServices,
      addService,
      removeService,
      clearServices,
      isServiceSelected
    }}>
      {children}
    </ServiceContext.Provider>
  )
}

export function useServices() {
  const context = useContext(ServiceContext)
  if (!context) {
    throw new Error('useServices must be used within ServiceProvider')
  }
  return context
}