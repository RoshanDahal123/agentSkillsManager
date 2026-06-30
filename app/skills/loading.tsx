export default function SkillsLoading() {

  return (
    <div className="grid md:grid-cols-3 gap-6 mt-4">
        {[1,2,3,4,5,6].map((item) => (
          <div className="card bg-base-300" key={item}>
            <div className="card-body">
              <div className="skeleton h-6 w-3/4"></div>
              <div className="skeleton h-4 w-full mt-2"></div>
            </div>
          </div>
        ))}
    </div>
  );
  
}
 
