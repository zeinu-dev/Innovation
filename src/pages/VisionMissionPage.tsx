import { Target, Compass, Heart, Star } from 'lucide-react';

interface VisionMissionPageProps {
  type: 'vision' | 'mission';
}

export default function VisionMissionPage({ type }: VisionMissionPageProps) {
  if (type === 'vision') {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full mb-6">
              <Target className="text-white" size={40} />
            </div>
            <h1 className="text-5xl font-bold text-gray-800 mb-4">Our Vision</h1>
            <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 mx-auto rounded-full"></div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-10 mb-12">
            <p className="text-2xl text-gray-700 leading-relaxed text-center font-medium">
              To be the leading catalyst for healthcare transformation, fostering a culture of continuous
              innovation and quality excellence that delivers world-class patient care and outcomes across
              all healthcare facilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-md p-8 border-l-4 border-teal-500">
              <div className="flex items-center mb-4">
                <Star className="text-teal-600 mr-3" size={28} />
                <h3 className="text-2xl font-bold text-gray-800">Excellence</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Striving for the highest standards in healthcare delivery, patient safety, and
                quality improvement initiatives.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 border-l-4 border-cyan-500">
              <div className="flex items-center mb-4">
                <Compass className="text-cyan-600 mr-3" size={28} />
                <h3 className="text-2xl font-bold text-gray-800">Innovation</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Embracing creative solutions and cutting-edge approaches to solve healthcare
                challenges and improve patient outcomes.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 border-l-4 border-blue-500">
              <div className="flex items-center mb-4">
                <Heart className="text-blue-600 mr-3" size={28} />
                <h3 className="text-2xl font-bold text-gray-800">Patient-Centered</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Placing patients at the heart of everything we do, ensuring their safety,
                dignity, and well-being guide all innovations.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 border-l-4 border-emerald-500">
              <div className="flex items-center mb-4">
                <Target className="text-emerald-600 mr-3" size={28} />
                <h3 className="text-2xl font-bold text-gray-800">Impact</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Creating measurable, sustainable improvements that transform healthcare
                delivery and positively affect communities nationwide.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full mb-6">
            <Compass className="text-white" size={40} />
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Our Mission</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full"></div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-10 mb-12">
          <p className="text-2xl text-gray-700 leading-relaxed text-center font-medium mb-8">
            To empower healthcare professionals with the resources, knowledge, and platform needed
            to drive innovation and quality improvement, ultimately enhancing patient care and
            safety across all healthcare settings.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-md p-8 border-l-4 border-teal-500">
            <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-start">
              <span className="inline-flex items-center justify-center w-8 h-8 bg-teal-100 text-teal-700 rounded-full mr-3 flex-shrink-0 font-bold">
                1
              </span>
              Foster a Culture of Innovation
            </h3>
            <p className="text-gray-600 leading-relaxed ml-11">
              Create an environment where healthcare professionals feel encouraged and supported
              to share innovative ideas and challenge the status quo.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 border-l-4 border-cyan-500">
            <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-start">
              <span className="inline-flex items-center justify-center w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full mr-3 flex-shrink-0 font-bold">
                2
              </span>
              Facilitate Knowledge Sharing
            </h3>
            <p className="text-gray-600 leading-relaxed ml-11">
              Provide a comprehensive repository of quality improvement projects, research, and
              best practices accessible to all healthcare professionals.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 border-l-4 border-blue-500">
            <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-start">
              <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-700 rounded-full mr-3 flex-shrink-0 font-bold">
                3
              </span>
              Support Quality Improvement Initiatives
            </h3>
            <p className="text-gray-600 leading-relaxed ml-11">
              Offer tools, training, and resources that enable healthcare facilities to implement
              evidence-based quality improvement projects effectively.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 border-l-4 border-emerald-500">
            <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-start">
              <span className="inline-flex items-center justify-center w-8 h-8 bg-emerald-100 text-emerald-700 rounded-full mr-3 flex-shrink-0 font-bold">
                4
              </span>
              Build Collaborative Networks
            </h3>
            <p className="text-gray-600 leading-relaxed ml-11">
              Connect healthcare professionals across different facilities and regions to share
              experiences, collaborate, and learn from each other.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 border-l-4 border-teal-600">
            <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-start">
              <span className="inline-flex items-center justify-center w-8 h-8 bg-teal-100 text-teal-700 rounded-full mr-3 flex-shrink-0 font-bold">
                5
              </span>
              Measure and Celebrate Impact
            </h3>
            <p className="text-gray-600 leading-relaxed ml-11">
              Track the implementation and outcomes of innovations and quality improvements,
              recognizing and celebrating successes to inspire continued excellence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
