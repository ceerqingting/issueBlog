package demo01;

import java.util.InputMismatchException;
import java.util.Scanner;

public class TryCatch {
    public void testSingleTypeError() {
        Scanner input = new Scanner(System.in);
        try {
            System.out.println("请输入你的年龄：");
            int age = input.nextInt();
            System.out.println("十年后你" + (age + 10));
        } catch (InputMismatchException e) {
            System.out.println("你应该输入整数！！！");
        }
        System.out.println("程序结束了");
    }
    public void testMultipleTypeError(){
        Scanner input = new Scanner(System.in);
        try {
            System.out.println("请输入第一个数：");
            int one = input.nextInt();
            System.out.println("请输入第二个数：");
            int two = input.nextInt();
            System.out.println("两数相除结果为：" + one / two);
        } catch (InputMismatchException e) {
            System.out.println("你应该输入整数");
        } catch (ArithmeticException e) {
            System.out.println("除数不能为0");
        } catch (Exception e) {
            System.out.println("我是不知名异常");
        }
        System.out.println("程序结束了");
    }
    public int test() {
        int divider = 10;
        int result = 100;
        try {
            while(divider > -1) {
                divider--;
                result = result + 100 / divider;
            }
            return result;
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("循环抛出异常了");
            return - 1;
        }
    }
    public int test2() {
        int divider = 10;
        int result = 100;
        try {
            while(divider > -1) {
                divider--;
                result = result + 100 / divider;
            }
            return result;
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("循环抛出异常了");
            return result = 999;
        } finally {
            System.out.println("这是finally!哈哈");
            System.out.println("result的值为" + result);
        }
    }
    public int test3() {
        int divider = 10;
        int result = 100;
        try {
            while(divider > -1) {
                divider--;
                result = result + 100 / divider;
            }
            return result;
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("循环抛出异常了");
        } finally {
            System.out.println("这是finally!哈哈");
            System.out.println("result的值为" + result);
        }
        System.out.println("test3()运行完了");
        return 111;
    }
    public static void main(String[] args) {
        TryCatch tc = new TryCatch();
       // tc.testSingleTypeError();
        //tc.testMultipleTypeError();
//        int result = tc.test();
//        System.out.println("test()方法执行完毕，返回值为" + result);
//          int result2 = tc.test2();
//          System.out.println("test2执行完毕");
           int result3 = tc.test3();
           System.out.println("end result的值为" + result3);
    }
}
