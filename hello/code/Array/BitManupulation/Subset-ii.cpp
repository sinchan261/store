class Solution {
public:
    vector<vector<int>> subsetsWithDup(vector<int>& nums) {
        int n=nums.size();
        int end=pow(2,n);
      vector<int>temp1;
        vector<vector<int>>result;
        result.push_back(temp1);
        set<vector<int>> uniqueSubsets;
        
        sort(nums.begin(), nums.end());
        for(int i=1;i<end;i++){
            int j=0;
              vector<int>temp;
              int p=i;
            while(j<n){

                if ((p&1)==1){
                    temp.push_back(nums[j]);

                }
                  p=p>>1;
                j++;
            }
          uniqueSubsets.insert(temp);
        }
            for (auto &subset : uniqueSubsets) {
            result.push_back(subset);
        }

        return result;
    }
};